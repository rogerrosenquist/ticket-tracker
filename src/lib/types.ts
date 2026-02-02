import { z } from 'zod';

// SCHEMAS (Runtime Validation) 

export const TicketSchema = z.object({
  // Using UUID is standard for production apps
  id: z.uuid().optional(), 
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(['open', 'in-progress', 'closed']).default('open'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  createdAt: z.date().default(() => new Date()),
});

// TYPES (Compile-time) 

// Infer the main type from Zod
export type Ticket = z.infer<typeof TicketSchema>;

// Mapped Types (Ported from 'mapped' file)

// z.input<T> preserves the "optionality" of fields with defaults
export type CreateTicketInput = Omit<z.input<typeof TicketSchema>, 'id' | 'createdAt'>;

export type UpdateTicketInput = Partial<CreateTicketInput> & Pick<Ticket, 'id'>;

export type ReadonlyTicket = Readonly<Ticket>;

// A Discriminated Union for handling success/failure safely
export type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };