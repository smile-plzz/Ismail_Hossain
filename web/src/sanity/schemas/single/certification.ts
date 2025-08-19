export default {
  name: 'certification',
  type: 'document',
  title: 'Certification',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'issuer', type: 'string', title: 'Issuer' },
    { name: 'date', type: 'string', title: 'Date' },
    { name: 'url', type: 'url', title: 'Certificate URL' },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;

