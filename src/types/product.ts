export type StoreType = 'amazon' | 'mercado' | 'aliexpress';

export interface Product {
  id: number;
  name: string;
  store: StoreType;
  storeLabel: string;
  link: string;
  image: string;
  alt: string;
  description: string[];
  youtubeIds: string[];
  tags: string[];
}
