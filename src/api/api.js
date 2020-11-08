const zodiacRouter = require('./resources/zodiac/zodiac.router');
const userRouter = require('./resources/user/user.router');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');


function routerAPI(app) {

    // api/zodiacs
    app.use('/api/zodiacs', zodiacRouter);

    // api/users 
    app.use('/api/users', userRouter);
}

module.exports = routerAPI;