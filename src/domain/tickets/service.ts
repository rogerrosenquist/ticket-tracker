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
  async getTickets(): Promise<Result<Ticket[]>> {
    const tickets = await this.readDb();
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

    // Merge existing ticket with new data
    // We purposefully exclude 'id' and 'createdAt' to prevent tampering
    const updatedTicket = {
      ...tickets[index],
      ...input,
      updatedAt: new Date(), // Good practice to track edit times
    };

    // Validate the result to ensure we didn't break the schema
    const validation = TicketSchema.safeParse(updatedTicket);
    if (!validation.success) {
      return { status: 'error', error: validation.error.issues[0].message };
    }

    // Save
    tickets[index] = updatedTicket;
    await this.writeDb(tickets);

    return { status: 'success', data: updatedTicket };
  }
}