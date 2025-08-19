export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    { name: 'role', type: 'string', title: 'Role' },
    { name: 'company', type: 'string', title: 'Company' },
    { name: 'start', type: 'string', title: 'Start' },
    { name: 'end', type: 'string', title: 'End' },
    { name: 'bullets', type: 'array', title: 'Highlights', of: [{ type: 'string' }] },
    { name: 'links', type: 'array', title: 'Links', of: [{ type: 'url' }] },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
