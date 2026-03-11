export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  bio2: string;
  bio3: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  available: boolean;
  years_experience: string;
  avatar_url?: string | null;
  updated_at?: string;
}

export interface Project {
  id: number;
  index: string;
  name: string;
  desc: string;
  highlights: string[];   // stored as jsonb in Supabase
  tags: string[];         // stored as jsonb in Supabase
  status: string;
  team: string;
  impact: string;
  accent: string;
  github: string;
  sort_order: number;
  created_at?: string;
}

export interface Skill {
  id: number;
  category: string;
  accent: string;
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  note: string;
  icon: string;
  sort_order: number;
  created_at?: string;
}

export interface Experience {
  id: number;
  title: string;
  org: string;
  period: string;
  duration: string;
  current: boolean;
  points: string[];       // stored as jsonb
  tags: string[];         // stored as jsonb
  sort_order: number;
  created_at?: string;
}

export interface Award {
  id: number;
  title: string;
  sub: string;
  year: string;
  org: string;
  sort_order: number;
  created_at?: string;
}
