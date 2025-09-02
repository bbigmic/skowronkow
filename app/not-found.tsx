import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Strona nie została znaleziona</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  )
}