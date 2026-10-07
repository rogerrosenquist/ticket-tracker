'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { createTicketAction, updateTicketAction } from '@/app/actions';
import type { Ticket, TicketFormState } from '@/lib/types';
import { Icon } from '@/components/ui/Icon';

export function TicketForm({ ticket }: { ticket?: Ticket }) {
  const [title, setTitle] = useState(ticket?.title ?? '');
  const [description, setDescription] = useState(ticket?.description ?? '');
  const [priority, setPriority] = useState<string>(ticket?.priority ?? 'medium');
  const [status, setStatus] = useState<string>(ticket?.status ?? 'open');
  const [state, action, isPending] = useActionState(
    async (_previousState: TicketFormState, formData: FormData): Promise<TicketFormState> => {
      if (ticket) return updateTicketAction(ticket.id as string, formData);
      await createTicketAction(formData);
      return null;
    },
    null,
  );

  return (
    <form action={action} className="ticket-form">
      <div className="form-section-title"><span className="section-number">01</span><div><h2>Ticket details</h2><p>Give the task a name and a little context.</p></div></div>
      <div className="field-group"><label htmlFor="title" className="required-label">Title</label><input type="text" name="title" id="title" required value={title} onChange={event => setTitle(event.target.value)} placeholder="What needs to get done?" aria-describedby="title-hint" /><p id="title-hint" className="field-hint">Keep it clear and specific. At least 3 characters.</p></div>
      <div className="field-group"><label htmlFor="description" className="required-label">Description</label><textarea name="description" id="description" rows={6} required value={description} onChange={event => setDescription(event.target.value)} placeholder="Add context, steps to reproduce, or what a good outcome looks like..." aria-describedby="description-hint" /><p id="description-hint" className="field-hint">A little detail helps. At least 10 characters.</p></div>
      <div className="form-divider" />
      <div className="form-section-title"><span className="section-number">02</span><div><h2>Organization</h2><p>Set the priority{ticket ? ' and current status' : ' so you know where to start'}.</p></div></div>
      <div className="form-columns"><div className="field-group"><label htmlFor="priority">Priority</label><select name="priority" id="priority" value={priority} onChange={event => setPriority(event.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select><p className="field-hint">How soon does this need attention?</p></div>{ticket ? <div className="field-group"><label htmlFor="status">Status</label><select name="status" id="status" value={status} onChange={event => setStatus(event.target.value)}><option value="open">Open</option><option value="in-progress">In Progress</option><option value="closed">Closed</option></select><p className="field-hint">Where does the work stand?</p></div> : <div className="new-ticket-note"><span className="badge-dot" /><p>Start with an open ticket.<small>You can update its status as work moves forward.</small></p></div>}</div>
      {state && <div role="alert" className="form-error"><Icon name="alert" size={18} /><span>{state.error}</span></div>}
      <div className="form-actions"><Link href={ticket ? `/tickets/${ticket.id}` : '/'} className="button button-secondary">Cancel</Link><button disabled={isPending} type="submit" className="button button-primary"><Icon name={ticket ? 'check' : 'plus'} size={18} />{isPending ? 'Saving...' : ticket ? 'Update Ticket' : 'Create Ticket'}</button></div>
    </form>
  );
}
