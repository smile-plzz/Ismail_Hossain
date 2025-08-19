import sanityClient from '@/sanity/client';
import { certificationsQuery } from '@/sanity/queries';

export type Certification = {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
};

export async function getCertifications(): Promise<Certification[]> {
  const data = await sanityClient.fetch<any[]>(certificationsQuery);
  return (data || []).map(c => ({ id: c._id, title: c.title, issuer: c.issuer, date: c.date, url: c.url }));
}


