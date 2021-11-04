const express = require('express');
const sequelize = require('./database');
const Product = require('./models/product');
const routes = require('./routes/product');
const errorHandler = require('./utils/errorHandler');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
    for (let i = 1; i <= 15; i++) {
        const product = {
            name: `product ${i}`,
            description: `description ${i}`
        }
        await Product.create(product);
    }
});

app.use('/product', routes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`);
})