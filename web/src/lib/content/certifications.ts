import { querySimpleList } from '@/notion/client';

export type Certification = {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
};

export async function getCertifications(): Promise<Certification[]> {
  const db = process.env.NOTION_CERTIFICATIONS_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  return rows.map((page: any) => {
    const p = page.properties || {};
    return {
      id: page.id,
      title: p.Title?.title?.[0]?.plain_text || 'Certification',
      issuer: p.Issuer?.rich_text?.[0]?.plain_text,
      date: p.Date?.rich_text?.[0]?.plain_text,
      url: p.URL?.url,
    };
  });
}


