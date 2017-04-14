import Koa from 'koa';
import serve from 'koa-static';
import onerror from 'koa-onerror';
import path from 'path';

import render from './../library/render';
import logger from './../library/logger';

const app = new Koa();
const port = 9527;

app.context.logger = logger;

app.use(serve(path.resolve(__dirname, '/../assets')));

app.use(async (ctx, next) => render(ctx, next));

app.on('error', (err, ctx) => {
    ctx.logger.error('server error', err);
});

onerror(app);

app.listen(port, () => {
    console.log('Server run on: http://0.0.0.0:%d', port);
});
