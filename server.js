'use strict';

const Hapi = require('@hapi/hapi');
const dotenv = require("dotenv")
const adminRoute = require("./Routes/AdminRoute")
const productRoute = require("./Routes/ProductROute")
const userRoute = require("./Routes/UserROute")
const wishListRoute = require("./Routes/WishListRoute")
const cartRouter = require("./Routes/CartRoute")
const orderRouter = require("./Routes/OrderRoute")
const catagoryRouter = require("./Routes/CatagoryRoute")


// dotenv 
dotenv.config();

const server = Hapi.server({
    port: process.env.PORT || 8500,
    host: process.env.HOST || 'localhost'
});

const init = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return '<h3>Hello!</h3>'
        }
    });

    await server.route(adminRoute);
    await server.route(productRoute);
    await server.route(userRoute);
    await server.route(wishListRoute);
    await server.route(cartRouter);
    await server.route(orderRouter);
    await server.route(catagoryRouter);

};

init();
