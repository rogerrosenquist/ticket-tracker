import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ticketService } from '@/domain/tickets/instance';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Icon } from '@/components/ui/Icon';

export default async function EditTicketPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId } = await params;
  const result = await ticketService.getTicket(ticketId);
  if (result.status === 'error') notFound();
  return <main id="main-content" className="page"><div className="page-topbar"><span>Workspace <span className="breadcrumb-divider">/</span> Tickets <span className="breadcrumb-divider">/</span> <strong>Edit ticket</strong></span></div><div className="form-page"><Link href={`/tickets/${ticketId}`} className="back-link"><Icon name="back" size={16} />Back to ticket</Link><div className="page-heading"><div><p className="eyebrow">KEEP THINGS MOVING</p><h1>Edit ticket<span className="heading-dot">.</span></h1><p className="page-description">Refine the details. Update the progress. Take the next step.</p></div></div><div className="form-panel"><TicketForm ticket={result.data} /></div><p className="form-footnote">Fields marked with * are required.</p></div></main>;
}
