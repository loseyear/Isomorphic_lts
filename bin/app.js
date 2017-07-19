import Koa from 'koa';
import serve from 'koa-static';
import onerror from 'koa-onerror';
import path from 'path';
import webpackMiddleware from 'koa-webpack';

import routes from './../server/routes';
import render from './../library/render';
import logger from './../library/logger';

import config from './../build/webpack.config';

const app = new Koa();
const port = 9527;

app.context.logger = logger;

app.use(serve(path.resolve(__dirname, './../assets/')));

app.use(webpackMiddleware({
  config: config,
  dev: {
    noInfo: false,
    publicPath: config.output.publicPath,
  }
}));

app.use(async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    return await routes.routes()(ctx, next);
  }
  return await render(ctx, next);
});

app.on('error', (err, ctx) => {
    ctx.logger.error('server error', err);
});

onerror(app);

app.listen(port, () => {
    console.warn('Server run on: http://0.0.0.0:%d', port);
});
