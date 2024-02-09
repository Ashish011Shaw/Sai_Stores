const controller = require("../Controller/ProductCntrl");
const { Authentication } = require("../Middleware/Authenticate");

module.exports = [
    {
        method: 'POST',
        path: '/add-product',
        options: {
            pre: [Authentication],
            handler: controller.addProduct
        },
    },
    {
        method: 'GET',
        path: '/get-products',
        handler: controller.getProducts
    },
    {
        method: 'GET',
        path: '/get-product/{id}',
        handler: controller.getSingleProductById
    },
    {
        method: 'PUT',
        path: '/update-product/{id}',
        options: {
            pre: [Authentication],
            handler: controller.updateProduct
        },
    },
    {
        method: 'DELETE',
        path: '/delete-product/{id}',
        options: {
            pre: [Authentication],
            handler: controller.deleteSingleProduct
        },
    },
]