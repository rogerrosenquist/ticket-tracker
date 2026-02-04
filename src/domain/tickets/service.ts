import { randomUUID } from 'crypto'; // Node.js native UUID generator
import type { Result } from '@/lib/types';
import type { Ticket, CreateTicketInput } from '../../lib/types';
import { TicketSchema } from '../../lib/types';

export class TicketService {
  // Simulating a database in memory
  private db: Ticket[] = [];

  async createTicket(input: CreateTicketInput): Promise<Result<Ticket>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Construct the full object
    const newTicketCandidate = {
      ...input,
      id: randomUUID(),
      createdAt: new Date(),
      // Apply defaults if they are missing
      status: input.status || 'open',
      priority: input.priority || 'medium'
    };

    // Validate using Zod
    const validation = TicketSchema.safeParse(newTicketCandidate);

    if (!validation.success) {
      return { 
        status: 'error', 
        error: validation.error.issues[0].message 
      };
    }

    // Save to "DB"
    const validTicket = validation.data;
    this.db.push(validTicket);

    return { status: 'success', data: validTicket };
  }

  async getTicket(id: string): Promise<Result<Ticket>> {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const ticket = this.db.find((t) => t.id === id);

    if (!ticket) {
      return { status: 'error', error: 'Ticket not found' };
    }

    return { status: 'success', data: ticket };
  }

  // Fetch ALL tickets for the dashboard
  async getTickets(): Promise<Result<Ticket[]>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    // Return the whole array
    return { status: 'success', data: this.db };
  }
}