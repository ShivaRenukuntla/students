var bunyan = require('bunyan');
var logger = bunyan.createLogger(
    {
        name: 'myapp',
        streams:[
            {
                level: 'info',
                path: 'logs/info.log'
            },
            {
                level: 'error',
                path: 'logs/error.log'
            },
            {
                level: 'warn',
                path: 'logs/warn.log'
            }
        ]
});

module.exports = logger;