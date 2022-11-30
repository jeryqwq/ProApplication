export default {
  // 同时支持 GET 和 POST
  '/api/users/1': { data: {} },
  '/api/foo/bar': { data: {} },

  // 支持标准 HTTP
  'POST /api/table': {
    code: 200,
    total: 20,
    data: {
      columnList: [
        {
          alias: 'name',
          name: 'name',
        },
        {
          alias: 'value',
          name: 'value',
        },
      ],
      data: [
        [
          'CPU异常',
          15,
        ],
        [
          '磁盘异常',
          3,
        ],
        [
          '内存异常',
          5,
        ],
        [
          '磁盘',
          3,
        ],
        [
          '内存',
          5,
        ],
      ],
    },
    size: 10,
  },
  'POST /api/data': {
    code: 200,
    data: {
      columnList: [
        {
          alias: 'name',
          name: 'name',
        },
        {
          alias: 'value',
          name: 'value',
        },
      ],
      data: [
        [
          'CPU异常',
          15,
        ],
        [
          '磁盘异常',
          3,
        ],
        [
          '内存异常',
          5,
        ],
        [
          '磁盘',
          3,
        ],
        [
          '内存',
          5,
        ],
      ],
    },
  },
  'DELETE /api/users': { users: [1, 2] },

};
