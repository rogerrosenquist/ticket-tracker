import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold text-gray-900">404</h2>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <p className="mt-1 text-gray-500">The ticket you are looking for does not exist.</p>
      
      <Link 
        href="/"
        className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Go back home
      </Link>
    </div>
  );
}