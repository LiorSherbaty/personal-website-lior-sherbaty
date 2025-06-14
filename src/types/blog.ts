
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  images?: Array<{
    url: string;
    caption?: string;
    alt: string;
  }>;
}

export interface BlogData {
  posts: BlogPost[];
}
