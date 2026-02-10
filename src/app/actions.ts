'use server'; // This directive marks all functions here as server-only endpoints

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ticketService } from '@/domain/tickets/instance';
import { TicketSchema } from '@/lib/types'; 

export async function createTicketAction(formData: FormData) {
  // Extract data from the native FormData object
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    // status is 'open' by default in our Schema, so we skip it
  };

  // Validate using Zod (Server-side validation is mandatory)
  // We use .safeParse to handle errors gracefully
  const validation = TicketSchema.pick({ 
    title: true, 
    description: true, 
    priority: true 
  }).safeParse(rawData);

  if (!validation.success) {
    // In a real app, we would return these errors to the form.
    // For this capstone step, we'll throw to keep it simple.
    throw new Error('Validation Failed: ' + validation.error.message);
  }

  // Call the Domain Service
  const result = await ticketService.createTicket(validation.data);

  if (result.status === 'error') {
    throw new Error(result.error);
  }

  // Revalidate & Redirect
  // This purges the cache for the dashboard so the new ticket appears immediately
  revalidatePath('/');
  redirect('/');
}

export async function updateTicketAction(id: string, formData: FormData) {
  // Extract data
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    status: formData.get('status'), // We allow editing status now
  };

  // Validate (Allow partial updates if needed, but here we expect a full form)
  const validation = TicketSchema.pick({
    title: true,
    description: true,
    priority: true,
    status: true,
  }).safeParse(rawData);

  if (!validation.success) {
    throw new Error('Validation Failed');
  }

  // Call Service
  await ticketService.updateTicket(id, validation.data);

  // Revalidate & Redirect
  revalidatePath(`/tickets/${id}`); // Refresh the details page
  revalidatePath('/');              // Refresh the dashboard
  redirect(`/tickets/${id}`);       // Go back to the details view
}

export async function deleteTicketAction(id: string) {
  // Call Service
  const result = await ticketService.deleteTicket(id);

  if (result.status === 'error') {
    throw new Error(result.error);
  }

  // Revalidate & Redirect
  // We are going back to the dashboard, so we must refresh it
  revalidatePath('/');
  redirect('/');
}