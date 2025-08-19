export default {
  name: 'venture',
  type: 'document',
  title: 'Venture',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'role', type: 'string', title: 'Role' },
    { name: 'start', type: 'string', title: 'Start' },
    { name: 'end', type: 'string', title: 'End' },
    { name: 'bullets', type: 'array', title: 'Highlights', of: [{ type: 'string' }] },
    { name: 'links', type: 'array', title: 'Links', of: [{ type: 'url' }] },
    { name: 'media', type: 'array', title: 'Media', of: [{ type: 'url' }] },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
