import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';

// Rate limiting: IP -> array of timestamps (max 3 per hour)
const rateLimit = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 60 minutes

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
    // --- Rate limiting: 3 per hour per IP ---
    const hdrs = await headers();
    const forwarded = hdrs.get('x-forwarded-for');
    const clientIp = forwarded?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';
    const now = Date.now();

    const timestamps = rateLimit.get(clientIp) || [];
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);

    if (recent.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'U heeft te veel aanvragen verstuurd. Probeer het over een uur opnieuw.' },
        { status: 429 },
      );
    }

    // --- API key check ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_placeholder_key') {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us via phone or WhatsApp.' },
        { status: 503 },
      );
    }

    const body = await request.json();

    // --- Honeypot ---
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // --- Sanitize ---
    const name = sanitize(body.name || '', 100);
    const email = sanitize(body.email || '', 254);
    const phone = sanitize(body.phone || '', 30);
    const service = String(body.service || '').trim();
    const description = sanitize(body.description || '', 2000);
    const startDate = body.startDate ? sanitize(String(body.startDate), 20) : undefined;

    // --- Validate name ---
    if (name.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    // --- Validate email ---
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (/[\n\r]|%0[aAdD]/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // --- Validate phone: 8-15 digits ---
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      return NextResponse.json({ error: 'Phone number must have 8-15 digits' }, { status: 400 });
    }

    // --- Validate service ---
    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json({ error: 'Please select a service' }, { status: 400 });
    }

    // --- Validate description ---
    if (description.length < 5) {
      return NextResponse.json({ error: 'Description must be at least 5 characters' }, { status: 400 });
    }

    // --- Validate date (if provided, must be today or future) ---
    if (startDate) {
      const dateVal = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(dateVal.getTime()) || dateVal < today) {
        return NextResponse.json({ error: 'Please select a future date' }, { status: 400 });
      }
    }

    // --- All checks passed, record rate limit ---
    recent.push(now);
    rateLimit.set(clientIp, recent);

    const resend = new Resend(apiKey);
    const serviceLabel = SERVICE_LABELS[service] ?? service;

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
                <a href="tel:${escapeHtml(phone)}" style="color: #DC2626;">${escapeHtml(phone)}</a>
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
