import sanityClient from '@/sanity/client';
import { projectsQuery } from '@/sanity/queries';
import { getProjectsFromNotion } from '@/notion/client';

export type Project = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
  coverUrl?: string;
};

export async function getProjects(): Promise<Project[]> {
  const source = process.env.CONTENT_SOURCE_PROJECTS || 'sanity';
  if (source === 'notion') {
    const db = process.env.NOTION_PROJECTS_DATABASE_ID || '';
    const projects = await getProjectsFromNotion(db);
    return projects.map(p => ({ id: p.id, title: p.title, description: p.description, tags: p.tags, demoUrl: p.demoUrl, repoUrl: p.repoUrl }));
  }
  const data = await sanityClient.fetch<any[]>(projectsQuery);
  return (data || []).map((p) => ({
    id: p._id,
    title: p.title,
    description: p.description,
    tags: p.tags,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
    coverUrl: p.cover?.asset?.url,
  }));
}

