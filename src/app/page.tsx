import { ticketService } from '@/domain/tickets/instance';
import { TicketCard } from '@/components/tickets/ticketCard';

export default async function Home() {
  const result = await ticketService.getTickets();

  if (result.status === 'error') {
    return <div>Error: {result.error}</div>;
  }

  const tickets = result.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </main>
  );
}