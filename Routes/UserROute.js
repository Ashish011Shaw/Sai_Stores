const controller = require("../Controller/UserCntrl");
const { Authentication } = require("../Middleware/Authenticate");


module.exports = [

    {
        method: 'POST',
        path: '/add-user',
        options: {
            pre: [Authentication],
            handler: controller.addCustomer
        },

    },
    {
        method: 'POST',
        path: '/user-login',
        handler: controller.userLogin
    },
]