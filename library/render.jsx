import React from 'react';
import { StaticRouter as Router, matchPath } from 'react-router';
import { renderToString } from 'react-dom/server';

import App from './../client/server.jsx';

const render = r => `
    <!doctype html>
    <div id="app">${renderToString(r)}</div>
`;

const routes = [
    '/',
    '/about'
];

export default async (ctx, next) => {
    const match = routes.reduce(
        (acc, route) =>
            matchPath(ctx.url, route, { exact: true }) || acc, null
    );

    if (!match) {
        console.log('a');
        ctx.status = 404;
        ctx.body = '404';
    }

    ctx.body = render(
        <Router
            context={{}}
            location={ctx.url}
        >
            <App />
        </Router>
    );

    await next();
};
