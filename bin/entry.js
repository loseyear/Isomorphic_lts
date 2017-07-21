require('babel-core/register')();
require('babel-polyfill');
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]_[local]_[hash:base64:5]'
});
require('css-modules-require-hook')({
  extensions: ['.less'],
  processorOpts: {
    parser: require('postcss-less').parse,
  },
  generateScopedName: '[name]_[local]_[hash:base64:5]',
});
require('./app.js');
