import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            TicketTracker
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-x-8">
          <Link 
            href="/" 
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
          >
            Dashboard
          </Link>
          <Link 
            href="/tickets" 
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
          >
            Tickets
          </Link>
        </nav>
      </div>
    </header>
  );
}