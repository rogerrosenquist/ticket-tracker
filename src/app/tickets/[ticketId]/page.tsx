import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';
import { deleteTicketAction } from '@/app/actions';

interface TicketPageProps {
  // In Next.js 15+, params is a Promise
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function TicketDetailsPage({ params }: TicketPageProps) {
  // Await params to get the ID string
  const { ticketId } = await params;

  // Fetch the ticket
  const result = await ticketService.getTicket(ticketId);

  if (result.status === 'error') {
    notFound();
  }

  const ticket = result.data;

  // Render
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Ticket Container */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        
        {/* Ticket Header */}
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400">ID: {ticket.id}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800`}>
                {ticket.status}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2">
              {/* Edit Button */}
              <Link
                href={`/tickets/${ticketId}/edit`}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit
              </Link>

              {/* Delete Button (Must be a Form) */}
              <form action={deleteTicketAction.bind(null, ticket.id as string)}>
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
          
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{ticket.title}</h1>
        </div>

        {/* Ticket Body */}
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
                {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}