import { sanityFetch } from '@/sanity/client';
import { skillsQuery } from '@/sanity/queries';

export type SkillGroup = { id: string; category: string; items: string[] };

export async function getSkills(): Promise<SkillGroup[]> {
  const data = await sanityFetch<any[]>(skillsQuery);
  return (data || []).map((s) => ({ id: s._id, category: s.category, items: s.items || [] }));
}


