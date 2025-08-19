export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    { name: 'headline', type: 'string', title: 'Headline' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
    { name: 'avatar', type: 'image', title: 'Avatar', options: { hotspot: true } },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phone', type: 'string', title: 'Phone' },
  ],
} as const;
