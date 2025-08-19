import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Site Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } }),
  ],
});

