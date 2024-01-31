const controller = require("../Controller/CartController");
const { UserAuth } = require("../Middleware/UserAuth");


module.exports = [
    {
        method: 'POST',
        path: '/add-to-cart/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.addToCart
        },

    },
    {
        method: 'DELETE',
        path: '/cart/remove-data/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.removeFromCart
        },

    },
    {
        method: 'PUT',
        path: '/cart/increase-product-quantity/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.increaseQuantity
        },

    },
    {
        method: 'PUT',
        path: '/cart/decrease-product-quantity/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.decreaseQuantity
        },

    },
]