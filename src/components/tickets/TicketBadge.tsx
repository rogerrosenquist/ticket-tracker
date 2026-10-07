import type { Ticket } from '@/lib/types';

export const statusLabels: Record<Ticket['status'], string> = {
  open: 'Open', 'in-progress': 'In progress', closed: 'Closed',
};

export function StatusBadge({ status }: { status: Ticket['status'] }) {
  return <span className={`status-badge status-${status}`}><span className="badge-dot" />{statusLabels[status]}</span>;
}

export function PriorityBadge({ priority }: { priority: Ticket['priority'] }) {
  return <span className={`priority-badge priority-${priority}`}><span className="priority-bars" aria-hidden="true"><i /><i /><i /></span>{priority} priority</span>;
}
