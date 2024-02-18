const controller = require("../Controller/CatagoryCntrl");
const { Authentication } = require("../Middleware/Authenticate");

module.exports =[
    {
        method: 'POST',
        path: '/add-catagory',
        options: {
            pre: [Authentication],
            handler: controller.createCatagory
        },
    },
]