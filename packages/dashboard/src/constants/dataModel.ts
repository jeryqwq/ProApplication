/* eslint-disable max-len */
export const dataModelData = { // 数据模型数据
  trigger: false,
  immediate: true,
  refresh: 0,
  transform: false, // 开启转义
  transformConfigs: [], // 转义所需字段名对应字典表中名称
  id: '', // 数据模型id
  dimensionListData: [], // 维度列表数据
  measureListData: [], // 度量列表数据
  hiddenFiled: [], // 下钻附加字段
  limit: 100, // 查询结果数
  urlParams: {
    paramsFormModelArr: [{
      filedId: [],
      linkType: '=',
      paramName: '',
      defaultValue: '',
      parmasLimit: false,
      defaultValueValidate: true,
      type: '',
    }], // 参数值数组
  }, // 关联url参数
  filters: {
    connect: 'AND',
    exprs: [],
  },
};

