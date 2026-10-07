import Link from 'next/link';
import type { ReadonlyTicket } from '@/lib/types';
import { Icon } from '@/components/ui/Icon';
import { PriorityBadge, StatusBadge } from './TicketBadge';

export function TicketCard({ ticket }: { ticket: ReadonlyTicket }) {
  const created = new Date(ticket.createdAt);
  return (
    <Link href={`/tickets/${ticket.id}`} className="ticket-card">
      <div className="ticket-card-top"><span className="ticket-reference">#{ticket.id?.slice(0, 8).toUpperCase()}</span><PriorityBadge priority={ticket.priority} /></div>
      <h3>{ticket.title}</h3>
      <p className="ticket-excerpt">{ticket.description}</p>
      <div className="ticket-card-bottom"><StatusBadge status={ticket.status} /><span className="ticket-date"><time dateTime={created.toISOString()}>{created.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time><Icon name="arrow" size={16} /></span></div>
    </Link>
  );
}
