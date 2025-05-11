import { apiService } from '@/services/apiService';
import type { HealthResponse } from './health.schemas';
import { healthResponseSchema } from './health.schemas';

/**
 * TSDoc: HealthService provides methods for checking the API's health status.
 */
export const HealthService = {
  /**
   * TSDoc: Checks the health status of the API.
   * @returns {Promise<HealthResponse>} A promise that resolves to the health status information.
   */
  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await apiService.get('/health');
      return healthResponseSchema.parse(response.data);
    } catch (error) {
      console.error('Failed to check API health:', error);
      throw error;
    }
  },
};
