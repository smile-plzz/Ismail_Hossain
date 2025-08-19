import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export type NotionProject = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  demoUrl?: string;
  repoUrl?: string;
};

export async function getProjectsFromNotion(databaseId: string): Promise<NotionProject[]> {
  if (!databaseId) return [];
  const res = await notion.databases.query({ database_id: databaseId });
  return res.results.map((page: any) => {
    const props = page.properties || {};
    const title = props.Name?.title?.[0]?.plain_text || 'Untitled';
    const description = props.Description?.rich_text?.[0]?.plain_text;
    const tags = (props.Tags?.multi_select || []).map((t: any) => t.name);
    const demoUrl = props.Demo?.url;
    const repoUrl = props.Repo?.url;
    return { id: page.id, title, description, tags, demoUrl, repoUrl };
  });
}

