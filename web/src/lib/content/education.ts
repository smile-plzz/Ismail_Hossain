import { sanityFetch } from '@/sanity/client';
import { educationQuery } from '@/sanity/queries';

export type Education = {
  id: string;
  degree: string;
  institution: string;
  details?: string[];
  startYear?: string;
  endYear?: string;
  gpa?: string;
};

export async function getEducation(): Promise<Education[]> {
  const data = await sanityFetch<any[]>(educationQuery);
  return (data || []).map(e => ({
    id: e._id,
    degree: e.degree,
    institution: e.institution,
    details: e.details || [],
    startYear: e.startYear,
    endYear: e.endYear,
    gpa: e.gpa,
  }));
}


