import whm from 'webpack-hot-middleware'
import wdm from 'webpack-dev-middleware'

function middleware(doIt, req, res) {
  const { end: originalEnd } = res

  return new Promise((resolve) => {
    res.end = function end() {
      originalEnd.apply(this, arguments)
      resolve(0)
    };
    doIt(req, res, () => {
      resolve(1)
    })
  });
}

export const dm = (compiler: any, option?: any) => {
  const doIt = wdm(compiler, option)

  async function koaMiddleware(ctx, next) {
    const { req } = ctx
    const locals = ctx.locals || ctx.state

    ctx.webpack = doIt

    const runNext = await middleware(doIt, req, {
      end(content) {
        ctx.body = content
      },
      locals,
      setHeader() {
        ctx.set.apply(ctx, arguments)
      },
      getHeader() { return null },
    })

    if (runNext) {
      await next()
    }
  }

  Object.keys(doIt).forEach(p => {
    koaMiddleware[p] = doIt[p]
  });

  return koaMiddleware
}

/*
export const dm = (compiler: any, opts?: any) => {
  const wdcp = wdm(compiler, opts)

  return async (ctx, next) => {
    const middleware = (res) => {
      const { end: originalEnd } = res
      return new Promise(
        (resolve) => {
          res.end = function end() {
            originalEnd.apply(this, arguments)
            resolve(0)
          }
          wdcp(ctx.req, res, () => resolve(1))
        },
      )
    }

    const rm = await middleware(
      {
        end(content) { ctx.body = content },
        setHeader() { ctx.set.apply(ctx, arguments) },
        getHeader() { return null },
      },
    )

    if (rm) await next()
  }
}
*/

/*
export const hm =  (compiler, opts?: any) => async (ctx, next) => {
  const middleware = () => {
    const { end: originalEnd } = ctx.res

    return new Promise((resolve) => {
      ctx.res.end = function end() {
        originalEnd.apply(this, arguments)
        resolve(0)
      }
      whm(
        compiler,
        opts,
      )
      (
        ctx.req,
        ctx.res,
        () => {
          resolve(1)
        },
      )
    })
  }

  if (await middleware()) await next()
}
*/

export const hm = (compiler: any, options?: any) => {
  let hot = whm(compiler, options)

  return async function (ctx, next) {
    let originalEnd = ctx.res.end

    await new Promise((resolve) => {
      ctx.res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(1)
    }

    hot(
      ctx.req,
      ctx.res,
      function () {
        resolve(1)
      })
    })

    await next()
  }
}

