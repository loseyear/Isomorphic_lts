const path = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  title,
  port,
} = require('./config')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../client/index.tsx'),
  },
  devServer: {
    port,
    // 允许所有域名访问
    allowedHosts: 'all',
    client: {
      webSocketTransport: 'ws',
      // 从浏览器获取
      // webSocketURL: 'auto://0.0.0.0:0/ws'
      // 固定 127.0.0.1
      webSocketURL: `ws://127.0.0.1:${port}/ws`,
    },
    webSocketServer: 'ws',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, '../client'),
        use: [
          {
            loader: 'swc-loader',
            options: {
              env: { mode: 'usage' },
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    // swc-loader will check whether webpack mode is 'development'
                    // and set this automatically starting from 0.1.13. You could also set it yourself.
                    // swc won't enable fast refresh when development is false
                    runtime: 'automatic',
                    refresh: true,
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      templateContent: ({htmlWebpackPlugin}) => `
        <!DOCTYPE html>
        <html lang="cmn-Hans">
          <head>
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <meta content="yes" name="apple-touch-fullscreen">
            <meta name="format-detection" content="telephone=no">
            <title>${title}</title>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="app"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

