const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const fs = require('fs');
const getPkgs = require('./scripts/utils/getPackages');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 打包库 生成dist文件（不做任何懒加载，全量打包）
let tailPkgs = getPkgs()
// const tailPkgs = ['table'];

const isCI = process.env.PRO_COMPONENTS_CI === 'CI';

const externals = isCI
  ? tailPkgs.reduce((pre, value) => {
      return {
        ...pre,
        [`@vis/${value}`]: `${value.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`,
      };
    }, {})
  : {};

const webPackConfigList = [];

module.exports = async () => {
  tailPkgs.forEach((pkg) => {
    const entry = {};
    entry[`${pkg}`] = `./packages/${pkg}/src/index.tsx`;
    if (!isCI) {
      entry[`${pkg}.min`] = `./packages/${pkg}/src/index.tsx`;
    }
    const config = {
      entry,
      output: {
        filename: '[name].js',
        library: `${pkg.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`,
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'packages', pkg, 'dist'),
        globalObject: 'this',
      },
      mode: 'production',
      resolve: {
        extensions: ['.ts', '.tsx', '.json', '.css', '.js', '.less'],
      },
      optimization: isCI
        ? {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                include: /\.min\.js$/,
              }),
              new CssMinimizerPlugin({
                include: /\.min\.js$/,
              }),
            ],
          }
        : { concatenateModules: false },
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|svg)$/i,
            type: 'asset',
          },
          {
            test: /\.jsx?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@umijs/babel-preset-umi/app'],
                plugins: [require('./scripts/replaceLib')],
              },
            },
          },
          {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@umijs/babel-preset-umi/app'],
                plugins: [require('./scripts/replaceLib')],
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader', // creates style nodes from JS strings
              },
              {
                loader: 'css-loader', // translates CSS into CommonJS
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) =>
                    `${path.relative(path.dirname(resourcePath), context)}/`,
                },
              },
              {
                loader: 'css-loader', // translates CSS into CommonJS
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      'root-entry-name': 'default',
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      externals: [
        {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          moment: 'moment',
          '@ant-design/pro-components': '@ant-design/pro-components',
          ...externals,
        },
      ],
      plugins: [
        new ProgressBarPlugin(),
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
    };
    webPackConfigList.push(config);
  });

  return webPackConfigList;
};
