export default {
  // 同时支持 GET 和 POST
  'mock/ssa/system/config/_getLoginCfg': {
    code: 200,
    message: '',
    data: {
      platformName: '亚信安全运营与态势感知平台-V3.0.1',
      loginBoxName: 'MAXS',
      pageBackground: '1482955959245631489',
      loginLogo: '1482910949594787841',
      mulTenant: 1,
      browserTabName: '安全运营与态势感知',
      browserTabLogo: '1440637765535522817',
    },
    ok: true,
  },
  'mock/sso/login/_isCaptcha': { data: false, message: 'sucess', state: true },
  'mock/sso/login/_getTenantList': {
    data: [
      { code: 'sys', label: '平台', value: -2 },
      { code: '123456', label: '默认租户', value: -1 },
    ],
    message: 'sucess',
    state: true,
  },

  'mock/sso/login/getLoginInfo': {
    data: [
      { code: 'sys', label: '平台', value: -2 },
      { code: '123456', label: '默认租户', value: -1 },
    ],
    message: 'sucess',
    state: true,
  },
};
