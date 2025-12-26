import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6 text-center px-4">
      <h2 className="text-4xl md:text-6xl font-bold text-pink-500">404</h2>
      <h3 className="text-2xl font-bold text-white">Page Not Found</h3>
      <p className="text-gray-400">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  )
}
