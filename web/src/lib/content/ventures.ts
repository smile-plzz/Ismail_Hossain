import sanityClient from '@/sanity/client';
import { venturesQuery } from '@/sanity/queries';

export type Venture = {
  id: string;
  name: string;
  role?: string;
  start?: string;
  end?: string;
  bullets?: string[];
  links?: string[];
  media?: string[];
};

export async function getVentures(): Promise<Venture[]> {
  const data = await sanityClient.fetch<any[]>(venturesQuery);
  return (data || []).map(v => ({
    id: v._id,
    name: v.name,
    role: v.role,
    start: v.start,
    end: v.end,
    bullets: v.bullets || [],
    links: v.links || [],
    media: v.media || [],
  }));
}


