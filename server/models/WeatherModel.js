import file from './../../library/file';

const WeatherModel = {};

WeatherModel.test = async (ctx, next, opt) => {
    try {
        const fileParam = {
            file: './data/weather_' + opt.id,
        };
        const data = await new Promise(resolve =>
            file.read(ctx, next, fileParam, (e, data) => {
                if (e) {
                    ctx.logger.error(e);
                    resolve({
                        code: 1,
                        error: e
                    });
                    return;
                }
                resolve({
                    code: 0,
                    response: data
                });
            })
        );

        return data;
    } catch (e) {
        ctx.logger.error(e);
    }

    await next();
};

export default WeatherModel;

