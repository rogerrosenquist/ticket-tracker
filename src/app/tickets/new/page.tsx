import Link from 'next/link';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Icon } from '@/components/ui/Icon';

export default function NewTicketPage() {
  return <main id="main-content" className="page"><div className="page-topbar"><span>Workspace <span className="breadcrumb-divider">/</span> Tickets <span className="breadcrumb-divider">/</span> <strong>New ticket</strong></span></div><div className="form-page"><Link href="/" className="back-link"><Icon name="back" size={16} />Back to Dashboard</Link><div className="page-heading"><div><p className="eyebrow">MAKE THE NEXT MOVE</p><h1>Create a ticket<span className="heading-dot">.</span></h1><p className="page-description">Get it out of your head and into your workspace.</p></div></div><div className="form-panel"><TicketForm /></div><p className="form-footnote">Fields marked with * are required.</p></div></main>;
}
