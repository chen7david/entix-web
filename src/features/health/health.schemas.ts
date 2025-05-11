import { z } from 'zod';

// Endpoint: GET /health
export const healthResponseSchema = z.object({
  status: z.string(), // e.g., "ok"
  message: z.string(), // e.g., "API is running"
  timestamp: z.string().datetime(), // Or z.coerce.date()
});
export type HealthResponse = z.infer<typeof healthResponseSchema>;
