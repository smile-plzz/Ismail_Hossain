import { sanityFetch } from '@/sanity/client';
import { experienceQuery } from '@/sanity/queries';

export type Experience = {
  id: string;
  role: string;
  company: string;
  start?: string;
  end?: string;
  bullets?: string[];
  links?: string[];
};

export async function getExperience(): Promise<Experience[]> {
  const data = await sanityFetch<any[]>(experienceQuery);
  return (data || []).map(x => ({
    id: x._id,
    role: x.role,
    company: x.company,
    start: x.start,
    end: x.end,
    bullets: x.bullets || [],
    links: x.links || [],
  }));
}


