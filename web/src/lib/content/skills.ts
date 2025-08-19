import { querySimpleList } from '@/notion/client';

export type SkillGroup = { id: string; category: string; items: string[] };

export async function getSkills(): Promise<SkillGroup[]> {
  const db = process.env.NOTION_SKILLS_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  return rows.map((page: any) => {
    const props = page.properties || {};
    const category = props.Category?.select?.name || 'General';
    const itemsRaw = props.Items?.rich_text?.[0]?.plain_text || '';
    const items = itemsRaw.split(',').map((s: string) => s.trim()).filter(Boolean);
    return { id: page.id, category, items };
  });
}


