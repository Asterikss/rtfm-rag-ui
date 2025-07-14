import { MessageSchema, MessageResponseSchema, IngestLinkSchema, IndexesInfo } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8032';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // If can't parse JSON error, use the status text
        }
        throw new ApiError(response.status, errorMessage);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async sendMessage(message: MessageSchema): Promise<MessageResponseSchema> {
    return this.request<MessageResponseSchema>('/api/v1/query', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async ingestLink(data: IngestLinkSchema): Promise<any> {
    return this.request('/api/v1/ingest/link', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getIndexesInfo(): Promise<IndexesInfo> {
    return this.request<IndexesInfo>('/api/v1/info/indexes', {
      method: 'GET',
    })
  };
}

export const apiClient = new ApiClient(API_BASE_URL);
