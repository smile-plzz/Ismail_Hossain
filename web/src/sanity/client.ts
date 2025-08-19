import { createClient } from 'next-sanity';

export const isSanityConfigured = Boolean(
  process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET
);

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'unset',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
  perspective: 'published',
});

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch<T>(query);
}

export default sanityClient;

