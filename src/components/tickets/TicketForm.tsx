'use client';

import { createTicketAction, updateTicketAction } from '@/app/actions';
import type { Ticket } from '@/lib/types';

interface TicketFormProps {
  // If provided, we are in "Edit Mode". If missing, "Create Mode".
  ticket?: Ticket; 
}

export function TicketForm({ ticket }: TicketFormProps) {
  // Decide which action to use
  // If editing, we bind the ID to the update action so the server knows WHICH ticket to update
  const action = ticket 
    ? updateTicketAction.bind(null, ticket.id as string) 
    : createTicketAction;

  return (
    <form action={action} className="space-y-6">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={ticket?.title} // Pre-fill if editing
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          required
          defaultValue={ticket?.description} // Pre-fill
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      {/* Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            id="priority"
            defaultValue={ticket?.priority || 'medium'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status - Only show if editing */}
        {ticket && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              id="status"
              defaultValue={ticket.status}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {ticket ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
}