import Link from 'next/link';
import { ticketService } from '@/domain/tickets/instance';
import { TicketCard } from '@/components/tickets/ticketCard';
import { TicketSearch } from '@/components/tickets/TicketSearch';
import { Icon } from '@/components/ui/Icon';

export default async function Home({ searchParams }: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const query = search || '';
  const result = await ticketService.getTickets(query);
  if (result.status === 'error') {
    return <main id="main-content" className="page"><div role="alert" className="form-error">{result.error}</div></main>;
  }
  const tickets = result.data;
  const overview = query ? await ticketService.getTickets() : result;
  const all = overview.status === 'success' ? overview.data : tickets;
  const stats = [
    { label: 'Total tickets', value: all.length, icon: 'ticket' as const, tone: 'total', caption: 'Everything in your workspace' },
    { label: 'Open', value: all.filter(t => t.status === 'open').length, icon: 'circle' as const, tone: 'open', caption: 'Ready for your attention' },
    { label: 'In progress', value: all.filter(t => t.status === 'in-progress').length, icon: 'clock' as const, tone: 'progress', caption: 'Moving in the right direction' },
    { label: 'Closed', value: all.filter(t => t.status === 'closed').length, icon: 'check' as const, tone: 'closed', caption: 'One less thing on your list' },
  ];

  return (
    <main id="main-content" className="page">
      <div className="page-topbar"><span>Workspace <span className="breadcrumb-divider">/</span> <strong>Overview</strong></span><span className="topbar-note"><span className="workspace-dot" />Personal workspace</span></div>
      <section id="overview" className="page-heading">
        <div><p className="eyebrow">YOUR WORK, AT A GLANCE</p><h1>Dashboard<span className="heading-dot">.</span></h1><p className="page-description">A clear view of what needs attention and what&apos;s moving forward.</p></div>
        <Link href="/tickets/new" className="button button-primary"><Icon name="plus" size={18} />New Ticket</Link>
      </section>
      <section className="stats-grid" aria-label="Ticket overview">
        {stats.map(stat => <div key={stat.label} className={`stat-card stat-${stat.tone}`}><div className="stat-top"><span>{stat.label}</span><span className="stat-icon"><Icon name={stat.icon} size={18} /></span></div><p className="stat-number">{stat.value.toString().padStart(2, '0')}</p><p className="stat-caption">{stat.caption}</p></div>)}
      </section>
      <section id="tickets" className="tickets-section" aria-labelledby="tickets-heading">
        <div className="section-heading"><div><h2 id="tickets-heading">Your tickets <span className="count-pill">{tickets.length}</span></h2><p>Small steps. Steady progress.</p></div><TicketSearch /></div>
        <div className="list-toolbar"><span className="list-tab">{query ? 'Search results' : 'All tickets'}<span>{tickets.length}</span></span><span className="list-hint">{query ? `Matching “${query}”` : 'Select a ticket to see the details'}</span></div>
        {tickets.length === 0 ? (
          <div className="empty-state"><span className="empty-icon"><Icon name={query ? 'search' : 'ticket'} size={30} /></span><h3>{query ? 'No matches this time.' : 'A fresh start.'}</h3><p>{query ? `We couldn't find any tickets matching “${query}”. Try another search.` : 'Turn your next task into a ticket. Everything starts with one.'}</p><Link href={query ? '/' : '/tickets/new'} className="button button-primary"><Icon name={query ? 'back' : 'plus'} size={18} />{query ? 'View all tickets' : 'Create your first ticket'}</Link></div>
        ) : <div className="ticket-grid">{tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}</div>}
      </section>
      <footer className="page-footer"><span>TicketTracker</span><span>A little structure goes a long way.</span></footer>
    </main>
  );
}
