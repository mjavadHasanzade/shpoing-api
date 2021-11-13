const express = require('express');
const sequelize = require('./database');
const Product = require('./models/product');
const routes = require('./routes/product');
const userRroutes = require('./routes/users');
var bodyParser = require('body-parser')
const errorHandler = require('./utils/errorHandler');
const app = express();
require('dotenv').config();
const i18next = require('i18next');
const i18Backend = require('i18next-fs-backend');
const i18Middleware = require('i18next-http-middleware');

const PORT = process.env.PORT || 5000;

i18next.use(i18Backend).use(i18Middleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})

sequelize.sync({ force: false }).then(async () => {
    // for (let i = 1; i <= 15; i++) {
    //     const product = {
    //         name: `product ${i}`,
    //         description: `description ${i}`,
    //         price: Math.floor(Math.random() * 1000000),
    //         quantity: Math.floor(Math.random() * 100)
    //     }
    //     await Product.create(product);
    // }
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(i18Middleware.handle(i18next));

app.use('/product', routes);
app.use('/users', userRroutes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`);
})