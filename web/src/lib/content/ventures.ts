import { querySimpleList } from '@/notion/client';

export type Venture = {
  id: string;
  name: string;
  role?: string;
  start?: string;
  end?: string;
  bullets?: string[];
  links?: string[];
  media?: string[];
};

export async function getVentures(): Promise<Venture[]> {
  const db = process.env.NOTION_VENTURES_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  return rows.map((page: any) => {
    const p = page.properties || {};
    const bulletsText = p.Bullets?.rich_text?.[0]?.plain_text || '';
    const links = (p.Links?.url ? [p.Links.url] : []).filter(Boolean);
    const media = (p.Media?.url ? [p.Media.url] : []).filter(Boolean);
    return {
      id: page.id,
      name: p.Name?.title?.[0]?.plain_text || 'Venture',
      role: p.Role?.rich_text?.[0]?.plain_text,
      start: p.Start?.rich_text?.[0]?.plain_text,
      end: p.End?.rich_text?.[0]?.plain_text,
      bullets: bulletsText ? bulletsText.split('\n').filter(Boolean) : [],
      links,
      media,
    };
  });
}


