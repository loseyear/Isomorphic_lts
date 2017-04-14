import Logger from 'mini-logger';

const logger = Logger({
    dir: './logs',
    categories: ['http'],
    format: '[{category}.]YYYY-MM-DD[.log]',
    timestamp: true
});

export default logger;
