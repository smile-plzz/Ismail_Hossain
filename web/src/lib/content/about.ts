import { sanityFetch } from '@/sanity/client';
import { aboutQuery } from '@/sanity/queries';

export type About = {
  headline?: string;
  body?: any;
  avatarUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
};

export async function getAbout(): Promise<About | null> {
  const data = await sanityFetch<any>(aboutQuery);
  if (!data) return null;
  return {
    headline: data.headline,
    body: data.body,
    avatarUrl: data.avatar?.asset?.url,
    location: data.location,
    email: data.email,
    phone: data.phone,
  };
}


