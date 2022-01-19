import Koa, { DefaultState } from 'koa'
import webpack from 'webpack'

import render from '../library/render'
import { dm, hm }  from '../library/webpack_middle'

import config from '../scripts/webpack.dev'

// @ts-ignore
const compiler = webpack(config)

const app:DefaultState = new Koa()

app.use(dm(
  compiler,
  {
    publicPath: config.output.publicPath,
  },
))
app.use(hm(compiler))

app.use(render)

app.listen(10901)
