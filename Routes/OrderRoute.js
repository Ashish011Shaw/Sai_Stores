const controller = require("../Controller/OrderCntrl");
const { UserAuth } = require("../Middleware/UserAuth");

module.exports = [
    {
        method: 'POST',
        path: '/place-order',
        options: {
            pre: [UserAuth],
            handler: controller.placeOrder
        },

    },
]