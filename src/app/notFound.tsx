import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  return <main id="main-content" className="page"><div className="empty-state not-found"><span className="empty-icon"><Icon name="ticket" size={32} /></span><p className="eyebrow">404 · TICKET NOT FOUND</p><h1>This one has moved on.</h1><p>The ticket you&apos;re looking for may have been deleted, or the link is incorrect.</p><Link href="/" className="button button-primary"><Icon name="back" size={18} />Back to Dashboard</Link></div></main>;
}
