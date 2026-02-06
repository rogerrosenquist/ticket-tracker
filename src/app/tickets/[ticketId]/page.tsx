import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';

interface TicketPageProps {
  // In Next.js 15+, params is a Promise
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function TicketDetailsPage({ params }: TicketPageProps) {

  const { ticketId } = await params;

  // Now fetch with the correct string ID
  const result = await ticketService.getTicket(ticketId);

  if (result.status === 'error') {
    notFound();
  }

  const ticket = result.data;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">ID: {ticket.id}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800`}>
              {ticket.status}
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{ticket.title}</h1>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-sm font-medium text-gray-900">Description</h3>
          <p className="mt-2 text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div>
              <span className="block text-xs font-medium text-gray-500">Priority</span>
              <span className="mt-1 block text-sm font-semibold capitalize text-gray-900">
                {ticket.priority}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-500">Created At</span>
              <span className="mt-1 block text-sm text-gray-900">
                {/* JSON dates are strings, so we re-hydrate it here */}
                {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}