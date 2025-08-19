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
  const db = process.env.NOTION_PROJECTS_DATABASE_ID || '';
  const projects = await getProjectsFromNotion(db);
  return projects.map(p => ({ id: p.id, title: p.title, description: p.description, tags: p.tags, demoUrl: p.demoUrl, repoUrl: p.repoUrl }));
}

