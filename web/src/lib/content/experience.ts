import { querySimpleList } from '@/notion/client';

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
  const db = process.env.NOTION_EXPERIENCE_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  return rows.map((page: any) => {
    const p = page.properties || {};
    const bulletsText = p.Bullets?.rich_text?.[0]?.plain_text || '';
    const links = (p.Links?.url ? [p.Links.url] : []).filter(Boolean);
    return {
      id: page.id,
      role: p.Role?.title?.[0]?.plain_text || 'Role',
      company: p.Company?.rich_text?.[0]?.plain_text || '',
      start: p.Start?.rich_text?.[0]?.plain_text,
      end: p.End?.rich_text?.[0]?.plain_text,
      bullets: bulletsText ? bulletsText.split('\n').filter(Boolean) : [],
      links,
    };
  });
}


