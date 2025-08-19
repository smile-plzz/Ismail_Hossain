export default {
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    { name: 'category', type: 'string', title: 'Category' },
    { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }] },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
