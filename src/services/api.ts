import { MessageSchema, MessageResponseSchema, IngestLinkSchema } from '@/types/api';

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
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(response.status, errorText || response.statusText);
    }

    return response.json();
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
}

export const apiClient = new ApiClient(API_BASE_URL);
