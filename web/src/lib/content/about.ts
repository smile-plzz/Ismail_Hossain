import { notion, querySimpleList } from '@/notion/client';

export type About = {
  headline?: string;
  body?: any;
  avatarUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
};

export async function getAbout(): Promise<About | null> {
  const db = process.env.NOTION_ABOUT_DATABASE_ID || '';
  const rows = await querySimpleList(db);
  const page: any = rows[0];
  if (!page) return null;
  const props = page.properties || {};
  return {
    headline: props.Headline?.rich_text?.[0]?.plain_text,
    avatarUrl: props.Avatar?.files?.[0]?.file?.url || props.Avatar?.files?.[0]?.external?.url,
    location: props.Location?.rich_text?.[0]?.plain_text,
    email: props.Email?.email,
    phone: props.Phone?.phone_number,
  };
}


