import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function Header() {
  return (
    <header className="sidebar">
      <Link href="/" className="brand"><span className="brand-mark"><Icon name="ticket" size={23} /></span><span>TicketTracker<span className="brand-caption">A little more organized.</span></span></Link>
      <div className="workspace-label"><span className="workspace-avatar">P</span><span>Personal workspace<small>Your everyday workspace</small></span></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav aria-label="Main navigation" className="sidebar-nav">
        <Link href="/#overview" className="nav-link"><Icon name="dashboard" />Dashboard</Link>
        <Link href="/" className="nav-link nav-primary"><Icon name="ticket" />Tickets<span className="nav-marker" /></Link>
        <Link href="/tickets/new" className="nav-link"><Icon name="plus" />New ticket</Link>
      </nav>
      <div className="sidebar-footer"><span className="workspace-dot" /><span>Local workspace<small>One place for all your tickets.</small></span></div>
    </header>
  );
}
