import { beforeEach, describe, expect, it, vi } from 'vitest';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ticketService } from '@/domain/tickets/instance';
import { updateTicketAction } from './actions';

vi.mock('next/navigation', () => ({ redirect: vi.fn() }));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('@/domain/tickets/instance', () => ({
  ticketService: { updateTicket: vi.fn() },
}));

function editData(title = 'Fix Login Bug') {
  const data = new FormData();
  data.set('title', title);
  data.set('description', 'Users cannot log in with email.');
  data.set('priority', 'high');
  data.set('status', 'in-progress');
  return data;
}

describe('updateTicketAction', () => {
  beforeEach(() => { vi.resetAllMocks(); });

  it('returns missing-ticket errors without revalidating or redirecting', async () => {
    vi.mocked(ticketService.updateTicket).mockResolvedValue({
      status: 'error', error: 'Ticket not found',
    });
    expect(await updateTicketAction('missing', editData())).toEqual({ error: 'Ticket not found' });
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns validation errors without calling the service', async () => {
    expect(await updateTicketAction('ticket-id', editData('Hi'))).toEqual({
      error: 'Title must be at least 3 characters',
    });
    expect(ticketService.updateTicket).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('reports storage failures without redirecting or exposing internal details', async () => {
    vi.mocked(ticketService.updateTicket).mockRejectedValue(new Error('private storage path'));
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      expect(await updateTicketAction('ticket-id', editData())).toEqual({
        error: 'Unable to update the ticket. Please try again.',
      });
      expect(revalidatePath).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    } finally {
      log.mockRestore();
    }
  });

  it('revalidates and redirects after a successful update', async () => {
    vi.mocked(ticketService.updateTicket).mockResolvedValue({
      status: 'success',
      data: {
        title: 'Fix Login Bug', description: 'Users cannot log in with email.',
        priority: 'high', status: 'in-progress', createdAt: new Date(),
      },
    });
    // Next.js redirects throw; this must remain outside the service error handler.
    const redirectSignal = new Error('NEXT_REDIRECT');
    vi.mocked(redirect).mockImplementation(() => { throw redirectSignal; });
    await expect(updateTicketAction('ticket-id', editData())).rejects.toBe(redirectSignal);
    expect(ticketService.updateTicket).toHaveBeenCalledWith('ticket-id', {
      title: 'Fix Login Bug', description: 'Users cannot log in with email.',
      priority: 'high', status: 'in-progress',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/tickets/ticket-id');
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/tickets/ticket-id');
  });
});
