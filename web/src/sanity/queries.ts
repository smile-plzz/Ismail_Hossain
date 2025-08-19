import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  ogImage{asset->{url}}
}`;

export const projectsQuery = groq`*[_type == "project"]|order(orderRank asc){
  _id,
  title,
  description,
  tags,
  demoUrl,
  repoUrl,
  cover{asset->{url}}
}`;

