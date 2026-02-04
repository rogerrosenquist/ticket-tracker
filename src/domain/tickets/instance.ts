import { TicketService } from './service';

// Initialize the service once
export const ticketService = new TicketService();

// Seed it with some dummy data so the UI isn't empty
// (This is just for development so we can see something)
ticketService.createTicket({
  title: "Fix Login Page",
  description: "Users are getting 500 errors when clicking login.",
  priority: "high",
  status: "open"
});

ticketService.createTicket({
  title: "Update Color Scheme",
  description: "Marketing wants the header to be darker.",
  priority: "low",
  status: "in-progress"
});