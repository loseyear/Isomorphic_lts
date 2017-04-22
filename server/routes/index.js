import Router from 'koa-router';
import Weather from './../controllers/Weather';

const router = new Router({
    prefix: '/api'
});

/*
 * @brief 测试数据
 * params  id
 * @return json
 */
router.get('/weather/:id', Weather.test);

export default router;

