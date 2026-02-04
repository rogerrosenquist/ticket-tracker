import type { ReadonlyTicket } from '@/lib/types';

interface TicketCardProps {
  ticket: ReadonlyTicket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  // Helper to color-code priorities
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    open: 'bg-green-100 text-green-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">{ticket.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span className={`inline-flex items-center rounded px-2 py-1 font-medium ${statusColors[ticket.status]}`}>
          {ticket.status.replace('-', ' ')}
        </span>
        <time>{ticket.createdAt.toLocaleDateString()}</time>
      </div>
    </div>
  );
}