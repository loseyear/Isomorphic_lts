import Koa, { DefaultState } from 'koa'

import render from '../library/render'

const app:DefaultState = new Koa()

app.use(render)

app.listen(3000)