import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchPath } from 'react-router';

import App from '../client/app'
import routes from '../client/router'

// render first screen
const temp = (content) => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>服务端渲染页面</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
</head>
<body>
<div id="app">${content}</div>
<script src="http://172.16.23.197:10901/app.js"></script>
</body>
</html>`
)

export default async (
    ctx: {
        body: string;
        url: string;
        status: number;
        redirect: any;
    }, next: () => any
) => {
    const match = routes.reduce(
        (acc, route) => matchPath(route.path, ctx.url) || acc,
        null,
    )

    if (match) {
        const content = renderToString(
            <React.StrictMode>
                <StaticRouter
                    location={ctx.url}
                >
                    <App />
                </StaticRouter>
            </React.StrictMode>
        )
    
        ctx.body = temp(content);
    } else {
        ctx.status = 301
        ctx.redirect('/')
    }

    

    await next();
};