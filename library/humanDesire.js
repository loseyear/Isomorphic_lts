import WeatherModel from './../server/models/WeatherModel';

export default async (ctx, next) => {
    ctx.state.id = 1;
    const opt = {
        id: ctx.state.id,
    };
    ctx.state.async = await WeatherModel.test(ctx, next, opt) || null;

    await next();
};

