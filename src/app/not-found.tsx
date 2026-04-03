import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="nl">
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <p className="text-7xl font-extrabold text-red-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Pagina niet gevonden
          </h1>
          <p className="mt-4 text-base text-gray-600">
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Terug naar homepagina
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
