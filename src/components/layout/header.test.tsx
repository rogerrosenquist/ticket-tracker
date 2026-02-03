import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header Component', () => {
  it('renders the brand name', () => {
    // 1. Render the component in the virtual DOM
    render(<Header />);
    
    // 2. Query elements (accessible lookup)
    const brand = screen.getByText(/TicketTracker/i);
    
    // 3. Assert presence
    expect(brand).toBeDefined();
  });

  it('contains navigation links', () => {
    render(<Header />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    const ticketsLink = screen.getByRole('link', { name: /tickets/i });

    expect(dashboardLink).toBeDefined();
    expect(ticketsLink).toBeDefined();
  });
});