export const Categories = {
  文字: [
    {
      alias: '概述',
      icon: 'describe',
      type: '文字',
      name: 'Describe',
    },
    {
      alias: '文字',
      icon: 'word',
      name: 'Word',
      type: '文字',
    },
  ],
  交互: [{
    alias: '搜索表单',
    name: 'SearchForm',
    icon: 'search-form',
    type: '交互',
  },
  {
    alias: '按钮组',
    icon: 'page-buttons',
    type: '交互',
    name: 'PageButtons',

  },
  ],
};
export const findCompType = (type: string, key1: string) => {
  for (const key in Categories) {
    const items = Categories[key];
    const item = items.find((i) => i.icon === type);
    if (item) return item[key1];
  }
};
