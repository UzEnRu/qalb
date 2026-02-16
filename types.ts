
export interface QuoteResponse {
  text: string;
  author: string;
  category: 'muhabbat' | 'tinchlik' | 'mehr' | 'do\'stlik';
}

export interface MiracleResponse {
  uzbek: string;
  english: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AppSection {
  Home = 'home',
  Wisdom = 'wisdom',
  Peace = 'peace',
  About = 'about'
}

export type MiracleType = 'muhabbat' | 'tinchlik' | 'do\'stlik';
