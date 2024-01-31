const controller = require("../Controller/AdminController");
const { Authentication } = require("../Middleware/Authenticate");


module.exports = [

    {
        method: 'POST',
        path: '/add-admin',
        handler: controller.createAdmin
    },
    {
        method: 'POST',
        path: '/admin-login',
        handler: controller.adminLogin
    },
]