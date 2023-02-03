import { AhooksPresent } from './ahooks-present';
import { antdIconPresent } from './antd-icons-present';
import { antdPresent } from './antd-present';
// import { lodashPresent } from './lodash-present';
import { umiPresent } from './umi-presents';
import { antdProPresent } from './antdpro-present';
const IconsResolver = require('unplugin-icons/resolver');

export const autoImportPlugin = () =>
  require('unplugin-auto-import/webpack')({
    dts: './auto-import.d.ts',
    include: [
      /\.[t]sx?$/, // .ts, .tsx,
    ],
    imports: [
      'react',
      {
        'antd/es': antdPresent,
        // 'lodash-es': lodashPresent,
        ahooks: AhooksPresent,
        '@ant-design/icons': antdIconPresent,
        '@umijs/max': umiPresent,
        '@ant-design/pro-components': antdProPresent,
      },
    ],
    vueTemplate: false,

    // Auto import for all module exports under directories
    // when using in file names mostly use prefixes _ and $ to avoid conflicts
    dirs: [
      // './xx/**', // all nested modules
    ],
    resolvers: [
      IconsResolver({
        componentPrefix: 'Icon',
        extension: 'jsx',
      }),
    ],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
  });
