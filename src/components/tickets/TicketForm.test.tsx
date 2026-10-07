import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createTicketAction, updateTicketAction } from '@/app/actions';
import { TicketForm } from './TicketForm';

vi.mock('@/app/actions', () => ({
  createTicketAction: vi.fn(), updateTicketAction: vi.fn(),
}));

describe('TicketForm', () => {
  beforeEach(() => { vi.resetAllMocks(); });

  it('shows an update error, preserves edits, and lets the user retry', async () => {
    vi.mocked(updateTicketAction).mockResolvedValue({ error: 'Ticket not found' });
    render(<TicketForm ticket={{
      id: 'f7fddc2b-7726-4a50-9047-b69bd8f02803',
      title: 'Original title', description: 'Original description text',
      priority: 'medium', status: 'open', createdAt: new Date(),
    }} />);
    const title = screen.getByLabelText('Title') as HTMLInputElement;
    fireEvent.change(title, { target: { value: 'Edited title' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update Ticket' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Ticket not found');
    expect(title.value).toBe('Edited title');
    const [id, data] = vi.mocked(updateTicketAction).mock.calls[0];
    expect(id).toBe('f7fddc2b-7726-4a50-9047-b69bd8f02803');
    expect(data.get('title')).toBe('Edited title');
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Update Ticket' }));
    await waitFor(() => { expect(updateTicketAction).toHaveBeenCalledTimes(2); });
  });

  it('still submits new tickets through the create action', async () => {
    vi.mocked(createTicketAction).mockResolvedValue(undefined);
    render(<TicketForm />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New ticket' } });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description for the new ticket' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Ticket' }));
    await waitFor(() => { expect(createTicketAction).toHaveBeenCalledTimes(1); });
    expect(vi.mocked(createTicketAction).mock.calls[0][0].get('title')).toBe('New ticket');
    expect(updateTicketAction).not.toHaveBeenCalled();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
