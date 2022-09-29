
const type = process.env.BUILD_TYPE;

let config = {};

if (type === 'lib') {
  config = {
    cjs: { type: 'babel', lazy: true },
    esm: false,
    runtimeHelpers: true,
    extraBabelPlugins: [
      [
        'babel-plugin-import',
        { libraryName: 'antd', libraryDirectory: 'lib', style: true },
        'antd',
      ],
    ],
  };
}

if (type === 'es') {
  config = {
    cjs: false,
    esm: {
      type: 'babel',
    },
    runtimeHelpers: true,
    extraBabelPlugins: [
      [require('./../../scripts/replaceLib')],
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  };
}

export default config;
