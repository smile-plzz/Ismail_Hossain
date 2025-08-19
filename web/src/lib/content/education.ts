import { querySimpleList } from '@/notion/client';

export type Education = {
  id: string;
  degree: string;
  institution: string;
  details?: string[];
  startYear?: string;
  endYear?: string;
  gpa?: string;
};

export async function getEducation(): Promise<Education[]> {
  const db = process.env.NOTION_EDUCATION_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  return rows.map((page: any) => {
    const p = page.properties || {};
    const detailsText = p.Details?.rich_text?.[0]?.plain_text || '';
    return {
      id: page.id,
      degree: p.Name?.title?.[0]?.plain_text || p.Degree?.rich_text?.[0]?.plain_text || 'Degree',
      institution: p.Institution?.rich_text?.[0]?.plain_text || '',
      details: detailsText ? detailsText.split('\n').filter(Boolean) : [],
      startYear: p.Start?.rich_text?.[0]?.plain_text || p.StartYear?.rich_text?.[0]?.plain_text,
      endYear: p.End?.rich_text?.[0]?.plain_text || p.EndYear?.rich_text?.[0]?.plain_text,
      gpa: p.GPA?.rich_text?.[0]?.plain_text,
    };
  });
}


