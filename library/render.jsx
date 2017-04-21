import React from 'react';
import { StaticRouter as Router, matchPath } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import configureStore from './../client/store';
import App from './../client/app.jsx';

// render first screen
const temp = (content, initialState) => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>服务端渲染页面</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<script src="/library/reset.js"></script>
<link rel="stylesheet" href="/styles/app.css">
</head>
<body>
<div id="app">${content}</div>
<script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
<script src="/library/react.js"></script>
<script src="/scripts/app.js"></script>
</body>
</html>`
);

// render 404
const notFound = status => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>服务端渲染页面</title>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="../styles/app.css">
</head>
<body>
<div id="app">服务器端${status}</div>
</body>
</html>`
);
// 声明路由
const routes = [
    '/',
    '/about',
    '/topics',
    '/count',
    '/topics/*',
    '/scripts',
];

export default async (ctx, next) => {
    const match = routes.reduce(
        (acc, route) =>
            matchPath(ctx.url, route, { exact: true }) || acc, null
    );

    if (!match.isExact) {
        ctx.status = 404;
        ctx.body = notFound(404);
        return;
    }
    const store = configureStore();
    const context = {};
    const content = renderToString(
        <Provider store={configureStore()}>
            <Router
                location={ctx.url}
                context={context}
            >
                <App />
            </Router>
        </Provider>
    );

    ctx.body = temp(content, store.getState());

    await next();
};
