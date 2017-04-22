import WeatherModel from './../models/WeatherModel';

const Weather = {};

// 模拟数据
Weather.test = async (ctx, next) => {
    try {
        const opt = {
            id: ctx.params.id,
        };
        const data = await WeatherModel.test(ctx, next, opt);
        ctx.status = data.code === 0 ? 200 : 404;
        ctx.body = data.code === 0 ? data.response : data.error;
    } catch (e) {
        ctx.logger.error(new Error(e));
    }
};

export default Weather;

