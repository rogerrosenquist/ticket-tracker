'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export function TicketSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('search', term);
    else params.delete('search');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="search-field">
      <label htmlFor="search" className="sr-only">Search</label>
      <Icon name="search" size={18} />
      <input id="search" type="search" placeholder="Search your tickets..." onChange={event => handleSearch(event.target.value)} defaultValue={searchParams.get('search') || ''} />
    </div>
  );
}
