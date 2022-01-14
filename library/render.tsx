import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchRoutes } from 'react-router'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import serialize from 'serialize-javascript'

import { ServerStyleSheet } from 'styled-components'

import App from '../client/app'
import routes from '../client/router'
import rootReducer from '../client/reducers'

// render first screen
const temp = (content, initialState, styleTags) => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>服务端渲染页面</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
${styleTags}
</head>
<body>
<div id="app">${content}</div>
<script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
<!--
<script src="http://172.16.23.197:10901/app.js"></script>
-->
</body>
</html>`
)


export default async (
    ctx: {
        body: string;
        url: string;
        status: number;
        redirect: any;
        header: any;
    },
    next: () => any
) => {
    console.log(ctx.header['user-agent'])
    const match = matchRoutes(routes, ctx.url)

    const middleware = [thunk]
    let store = createStore(rootReducer, applyMiddleware(...middleware)) || null

    // @ts-ignore
    const route = match[0]?.route?.element?.getInitialProps
    if (route) store = await route({store})

    const sheet = new ServerStyleSheet()

    if (match) {
        const content = renderToString(
            sheet.collectStyles(
                <React.StrictMode>
                    <Provider store={store}>
                        <StaticRouter
                            location={ctx.url}
                        >
                            <App />
                        </StaticRouter>
                    </Provider>
                </React.StrictMode>
            )
        )

        ctx.body = temp(content, store.getState(), sheet.getStyleTags())
    } else {
        ctx.status = 301
        ctx.redirect('/')
    }

    await next()
}