import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import type { Result, Ticket } from '@/lib/types'; // Adjust if your types are elsewhere
import { TicketSchema } from '@/lib/types';       // Adjust if needed

// Locate the file safely
const DB_PATH = path.join(process.cwd(), 'db.json');

export class TicketService {
  
  // Helper: Read from file
  private async readDb(): Promise<Ticket[]> {
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed;
    } catch (error) {
      console.error("FAILED TO READ DB:", error);
      return [];
    }
  }

  // Helper: Write to file
  private async writeDb(tickets: Ticket[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2));
  }

  // --- FEATURE 1: GET ALL ---
  // Update the signature to accept a query string
  async getTickets(query?: string): Promise<Result<Ticket[]>> {
    let tickets = await this.readDb();

    // If a query exists, filter the list
    if (query) {
      const lowerQuery = query.toLowerCase();
      tickets = tickets.filter((t) => 
        t.title.toLowerCase().includes(lowerQuery) || 
        t.description.toLowerCase().includes(lowerQuery)
      );
    }

    return { status: 'success', data: tickets };
  }

  // --- FEATURE 2: GET ONE ---
  async getTicket(id: string): Promise<Result<Ticket>> {
    const tickets = await this.readDb();
    const ticket = tickets.find((t) => t.id === id);

    if (!ticket) {
      return { status: 'error', error: 'Ticket not found' };
    }

    return { status: 'success', data: ticket };
  }

  // --- FEATURE 3: CREATE ---
  async createTicket(input: any): Promise<Result<Ticket>> {
    // 1. Prepare
    const newTicketCandidate = {
      ...input,
      id: randomUUID(),
      createdAt: new Date(), // NOTE: JSON turns dates into strings, we'll handle this in a moment
      status: input.status || 'open',
      priority: input.priority || 'medium'
    };

    // Validate
    const validation = TicketSchema.safeParse(newTicketCandidate);
    if (!validation.success) {
      return { status: 'error', error: validation.error.issues[0].message };
    }

    // Save
    const tickets = await this.readDb();
    const validTicket = validation.data;
    
    tickets.push(validTicket);
    await this.writeDb(tickets);

    return { status: 'success', data: validTicket };
  }

  // --- FEATURE 4: UPDATE ---
  async updateTicket(id: string, input: Partial<Ticket>): Promise<Result<Ticket>> {
    const tickets = await this.readDb();
    const index = tickets.findIndex((t) => t.id === id);

    if (index === -1) {
      return { status: 'error', error: 'Ticket not found' };
    }

    const existingTicket = tickets[index];

    // Merge existing ticket with new data
    const updatedTicket = {
      ...existingTicket,
      ...input,
      // FIX: Manually convert the JSON string back to a real Date object
      createdAt: new Date(existingTicket.createdAt),
      updatedAt: new Date(), 
    };

    // Now Zod will be happy because createdAt is a Date object
    const validation = TicketSchema.safeParse(updatedTicket);
    if (!validation.success) {
      return { status: 'error', error: validation.error.issues[0].message };
    }

    tickets[index] = updatedTicket;
    await this.writeDb(tickets);

    return { status: 'success', data: updatedTicket };
  }

  // --- FEATURE 5: DELETE ---
  async deleteTicket(id: string): Promise<Result<void>> {
    const tickets = await this.readDb();
    
    // Check if it exists first
    const exists = tickets.some((t) => t.id === id);
    if (!exists) {
      return { status: 'error', error: 'Ticket not found' };
    }

    // Filter out the ticket
    const newTickets = tickets.filter((t) => t.id !== id);
    
    // Save
    await this.writeDb(newTickets);
    
    return { status: 'success', data: undefined };
  }

  
}