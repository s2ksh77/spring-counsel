export const getMenu = (key: string): [] => {
  switch (key) {
    case 'introduce':
      return [
        { key: 'center', value: '' },
        { key: 'member', value: '/member' },
        { key: 'location', value: '/location' },
      ];
    case 'counsel':
      return [
        { key: 'private', value: '/private' },
        { key: 'family', value: '/family' },
        { key: 'group', value: '/group' },
        { key: 'test', value: '/test' },
      ];
    case 'education':
      return [
        { key: 'counselor', value: '/counselor' },
        { key: 'analysis', value: '/analysis' },
      ];
    case 'proposal':
      return [{ key: 'proposal', value: '/proposal' }];
    case 'news':
      return [
        { key: 'notice', value: '/notice' },
        { key: 'review', value: '/review' },
      ];
  }
};
