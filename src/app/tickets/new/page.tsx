import { CreateTicketForm } from '@/components/tickets/createTicketForm';

export default function NewTicketPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Create New Ticket</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <CreateTicketForm />
      </div>
    </main>
  );
}