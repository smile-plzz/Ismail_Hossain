export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
    { name: 'demoUrl', type: 'url', title: 'Demo URL' },
    { name: 'repoUrl', type: 'url', title: 'Repository URL' },
    { name: 'cover', type: 'image', title: 'Cover', options: { hotspot: true } },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
