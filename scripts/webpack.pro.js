const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../client/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
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
                    runtime: 'automatic',
                    refresh: false,
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
    new HtmlWebpackPlugin({
      title: 'aaa',
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
            <title>筋斗云</title>
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

