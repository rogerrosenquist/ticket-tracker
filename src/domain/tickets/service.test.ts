// src/domain/tickets/service.test.ts
import { describe, it, expect } from 'vitest';
import { TicketService } from './service';

describe('TicketService', () => {
  const service = new TicketService();

  it('should create a valid ticket with defaults', async () => {
    // Arrange: Define valid input
    const input = {
      title: 'Fix Login Bug',
      description: 'Users cannot log in with email.',
      // Intentionally omitting status/priority to test defaults
    };

    // Act: Call the service
    const result = await service.createTicket(input);

    // Assert: Verify the result structure
    expect(result.status).toBe('success');

    if (result.status === 'success') {
      expect(result.data.id).toBeDefined(); // UUID exists
      expect(result.data.title).toBe(input.title);
      expect(result.data.status).toBe('open'); // Default applied
      expect(result.data.createdAt).toBeInstanceOf(Date);
    }
  });

  it('should fail validation when title is too short', async () => {
    // Arrange: Invalid input (title < 3 chars)
    const input = {
      title: 'Hi', 
      description: 'Short description.',
    };

    // Act
    const result = await service.createTicket(input);

    // Assert
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      // "Title must be at least 3 characters"
      expect(result.error).toContain('Title'); 
    }
  });
});