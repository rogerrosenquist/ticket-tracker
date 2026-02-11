import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';
import { TicketCard } from '@/components/tickets/ticketCard';
import { TicketSearch } from '@/components/tickets/TicketSearch';

export default async function Home({
  searchParams,
}: {
  // Define searchParams as a Promise
  searchParams: Promise<{ search?: string }>;
}) {
  // Await the promise to extract the data
  const { search } = await searchParams;
  const query = search || '';

  // Fetch filtered data
  const result = await ticketService.getTickets(query);

  if (result.status === 'error') {
    return <div className="p-8 text-red-600">Error: {result.error}</div>;
  }

  const tickets = result.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="flex w-full max-w-sm items-center gap-2">
          <TicketSearch />
          <Link 
            href="/tickets/new"
            className="whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            New Ticket
          </Link>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-gray-500">No tickets found matching &quot;{query}&quot;.</p>
        </div>
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