import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';
import { TicketCard } from '@/components/tickets/ticketCard';

export default async function Home() {
  // Fetch data from our singleton service
  const result = await ticketService.getTickets();

  // Simple error handling
  if (result.status === 'error') {
    return <div className="p-8 text-red-600">Error: {result.error}</div>;
  }

  const tickets = result.data;

  // Render grid
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        {/* CHANGED: Now uses the Next.js Link component */}
        <Link 
          href="/tickets/new"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          New Ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </main>
  );
}