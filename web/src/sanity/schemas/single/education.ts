export default {
  name: 'education',
  type: 'document',
  title: 'Education',
  fields: [
    { name: 'degree', type: 'string', title: 'Degree' },
    { name: 'institution', type: 'string', title: 'Institution' },
    { name: 'details', type: 'array', title: 'Details', of: [{ type: 'string' }] },
    { name: 'startYear', type: 'string', title: 'Start Year' },
    { name: 'endYear', type: 'string', title: 'End Year' },
    { name: 'gpa', type: 'string', title: 'GPA/CGPA' },
    { name: 'orderRank', type: 'number', title: 'Order' },
  ],
} as const;
