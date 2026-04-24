import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';

const RATE_LIMIT_WINDOW_SECONDS = 3600;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ALLOWED_ORIGINS = [
  'https://kubusklus.nl',
  'https://www.kubusklus.nl',
  'https://kubusklus-website.vercel.app',
];

// Preview deployments use dynamic vercel.app subdomains — allow them
// in development and preview builds only.
const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';

async function checkRateLimit(ip: string): Promise<{ ok: boolean; retryAfter?: number }> {
  if (!ip || ip === 'unknown') return { ok: true };

  const key = `ratelimit:quote:${ip}`;

  try {
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }
    if (count > RATE_LIMIT_MAX_REQUESTS) {
      const ttl = await kv.ttl(key);
      return { ok: false, retryAfter: Math.max(ttl, 60) };
    }
    return { ok: true };
  } catch (err) {
    console.error('Rate limit KV error:', err);
    return { ok: true };
  }
}

const ALLOWED_SERVICES = [
  'facades', 'roughcast', 'walls', 'decorative', 'sanding',
  'painting', 'tiles', 'parquet', 'partitions', 'other',
];

const SERVICE_LABELS: Record<string, string> = {
  facades: 'Buitengevels',
  roughcast: 'Raapwerk',
  walls: 'Wanden en Plafond',
  decorative: 'Sier- en Pleisterwerk',
  sanding: 'Schuurwerk',
  painting: 'Schilderwerk',
  tiles: 'Tegels Plaatsen',
  parquet: 'Parket Neerleggen',
  partitions: 'Tussenwanden Plaatsen',
  other: 'Anders',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

function sanitize(str: string, maxLen: number): string {
  return stripHtml(str).trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    // --- Origin check: block cross-origin / no-Origin requests ---
    const origin = request.headers.get('origin') || '';
    const isAllowed = ALLOWED_ORIGINS.includes(origin) || (isPreview && origin.endsWith('.vercel.app'));
    if (!isAllowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse body first so locale is available for all error messages
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // --- Rate limiting: 5 per hour per IP (Vercel KV / Upstash) ---
    const hdrs = await headers();
    const forwarded = hdrs.get('x-forwarded-for');
    const clientIp = forwarded?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';

    const rl = await checkRateLimit(clientIp);
    if (!rl.ok) {
      const nl = body.locale === 'nl';
      return NextResponse.json(
        { error: nl ? 'Te veel verzoeken. Probeer het later opnieuw.' : 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: rl.retryAfter ? { 'Retry-After': String(rl.retryAfter) } : undefined,
        },
      );
    }

    // --- API key check ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_placeholder_key') {
      console.error('Email service not configured: RESEND_API_KEY is missing or set to placeholder');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us via phone or WhatsApp.' },
        { status: 503 },
      );
    }

    // --- Honeypot ---
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // --- Locale-aware error messages ---
    const nl = body.locale === 'nl';
    const msg = {
      nameTooShort: nl ? 'Naam moet minimaal 2 tekens bevatten' : 'Name must be at least 2 characters',
      invalidEmail: nl ? 'Ongeldig e-mailadres' : 'Invalid email address',
      phoneBadLength: nl ? 'Telefoonnummer moet 8-15 cijfers bevatten' : 'Phone number must have 8-15 digits',
      selectService: nl ? 'Selecteer een dienst' : 'Please select a service',
      descTooShort: nl ? 'Beschrijving moet minimaal 5 tekens bevatten' : 'Description must be at least 5 characters',
      futureDate: nl ? 'Selecteer een datum in de toekomst' : 'Please select a future date',
    };

    // --- Sanitize ---
    const name = sanitize(String(body.name || ''), 100);
    const email = sanitize(String(body.email || ''), 254);
    const phone = sanitize(String(body.phone || ''), 30);
    const service = String(body.service || '').trim();
    const description = sanitize(String(body.description || ''), 2000);
    const startDate = body.startDate ? sanitize(String(body.startDate), 20) : undefined;

    // --- Validate name ---
    if (name.length < 2) {
      return NextResponse.json({ error: msg.nameTooShort }, { status: 400 });
    }

    // --- Validate email ---
    if (!EMAIL_REGEX.test(email) || /[\n\r]|%0[aAdD]/.test(email)) {
      return NextResponse.json({ error: msg.invalidEmail }, { status: 400 });
    }

    // --- Validate phone: optional, but if provided must be 8-15 digits ---
    if (phone) {
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        return NextResponse.json({ error: msg.phoneBadLength }, { status: 400 });
      }
    }

    // --- Validate service ---
    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json({ error: msg.selectService }, { status: 400 });
    }

    // --- Validate description ---
    if (description.length < 5) {
      return NextResponse.json({ error: msg.descTooShort }, { status: 400 });
    }

    // --- Validate date (if provided, must be today or future) ---
    if (startDate) {
      const dateVal = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(dateVal.getTime()) || dateVal < today) {
        return NextResponse.json({ error: msg.futureDate }, { status: 400 });
      }
    }

    const resend = new Resend(apiKey);
    const serviceLabel = SERVICE_LABELS[service] ?? service;
    const phoneMissingLabel = nl ? '(niet opgegeven)' : '(not provided)';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #DC2626; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nieuwe Offerte Aanvraag</h1>
        </div>
        <div style="padding: 24px; background-color: #f9fafb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 140px;">Naam</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">E-mail</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">
                <a href="mailto:${escapeHtml(email)}" style="color: #DC2626;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Telefoon</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">
                ${phone
                  ? `<a href="tel:${escapeHtml(phone)}" style="color: #DC2626;">${escapeHtml(phone)}</a>`
                  : `<span style="color: #9ca3af; font-style: italic;">${escapeHtml(phoneMissingLabel)}</span>`}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Dienst</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${escapeHtml(serviceLabel)}</td>
            </tr>
            ${startDate ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Startdatum</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${escapeHtml(startDate)}</td>
            </tr>
            ` : ''}
          </table>
          <div style="margin-top: 20px;">
            <h3 style="color: #374151; margin-bottom: 8px;">Projectomschrijving</h3>
            <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="color: #4b5563; margin: 0; white-space: pre-wrap;">${escapeHtml(description)}</p>
            </div>
          </div>
        </div>
        <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
          Verzonden via kubusklus.nl offerteformulier
        </div>
      </div>
    `;

    const ownerEmail = process.env.OWNER_EMAIL || 'info@kubusklus.nl';

    const { error } = await resend.emails.send({
      from: 'Kubusklus Website <onboarding@resend.dev>',
      to: ownerEmail,
      replyTo: email,
      subject: `Nieuwe Offerte Aanvraag - ${serviceLabel} - ${name}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send quote error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
