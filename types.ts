export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Game {
  name: string;
  imageUrl: string;
}