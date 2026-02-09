import { notFound } from 'next/navigation';
import { ticketService } from '@/domain/tickets/instance';
import { TicketForm } from '@/components/tickets/TicketForm';

interface EditPageProps {
  params: Promise<{ ticketId: string }>;
}

export default async function EditTicketPage({ params }: EditPageProps) {
  const { ticketId } = await params;
  const result = await ticketService.getTicket(ticketId);

  if (result.status === 'error') {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Edit Ticket</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Pass the existing ticket to the form to enable "Edit Mode" */}
        <TicketForm ticket={result.data} />
      </div>
    </main>
  );
}