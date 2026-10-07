import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';
import { deleteTicketAction } from '@/app/actions';
import { Icon } from '@/components/ui/Icon';
import { PriorityBadge, StatusBadge } from '@/components/tickets/TicketBadge';

export default async function TicketDetailsPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId } = await params;
  const result = await ticketService.getTicket(ticketId);
  if (result.status === 'error') notFound();
  const ticket = result.data;
  const created = new Date(ticket.createdAt);
  return (
    <main id="main-content" className="page">
      <div className="page-topbar"><span>Workspace <span className="breadcrumb-divider">/</span> Tickets <span className="breadcrumb-divider">/</span> <strong>Ticket details</strong></span></div>
      <div className="detail-page"><Link href="/" className="back-link"><Icon name="back" size={16} />Back to Dashboard</Link>
        <div className="detail-heading"><div><div className="detail-kicker"><span className="ticket-reference">#{ticket.id?.slice(0, 8).toUpperCase()}</span><StatusBadge status={ticket.status} /></div><h1>{ticket.title}</h1></div><Link href={`/tickets/${ticketId}/edit`} className="button button-primary"><Icon name="edit" size={18} />Edit</Link></div>
        <div className="detail-grid"><section className="detail-description"><div className="panel-heading"><Icon name="ticket" size={20} /><h2>Description</h2></div><p>{ticket.description}</p></section><aside className="detail-properties" aria-label="Ticket properties"><h2>The details</h2><dl><div><dt>Status</dt><dd><StatusBadge status={ticket.status} /></dd></div><div><dt>Priority</dt><dd><PriorityBadge priority={ticket.priority} /></dd></div><div><dt>Created</dt><dd><time dateTime={created.toISOString()}>{created.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time></dd></div><div><dt>Ticket ID</dt><dd className="full-ticket-id">{ticket.id}</dd></div></dl><div className="delete-section"><form action={deleteTicketAction.bind(null, ticket.id as string)}><button type="submit" className="button button-danger"><Icon name="trash" size={16} />Delete</button></form><p>Remove this ticket from your workspace.</p></div></aside></div>
      </div>
    </main>
  );
}
