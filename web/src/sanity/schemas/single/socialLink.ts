export default {
  name: 'socialLink',
  type: 'document',
  title: 'Social Link',
  fields: [
    { name: 'label', type: 'string', title: 'Label' },
    { name: 'url', type: 'url', title: 'URL' },
    { name: 'icon', type: 'string', title: 'Icon (e.g. linkedin, github)' },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
