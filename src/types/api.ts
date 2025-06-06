export interface MessageSchema {
  text: string;
  indexName: string;
  userId: string;
}

export interface MessageResponseSchema {
  text: string;
  links: string[];
}

export interface IngestLinkSchema {
  url: string;
  indexName: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  links?: string[];
  timestamp: Date;
}

export interface Index {
  id: number;
  name: string;
  source_url: string;
}

export interface IndexesInfo {
  numberOfIndexes: number;
  indexesNames: string[];
}
