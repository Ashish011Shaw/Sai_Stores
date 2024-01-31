const controller = require("../Controller/WishListCntrl");
const { UserAuth } = require("../Middleware/UserAuth");

module.exports = [
    {
        method: 'POST',
        path: '/add-to-wish-list/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.addToWishList
        },

    },
    {
        method: 'DELETE',
        path: '/wish-list/remove-product/{id}',
        options: {
            pre: [UserAuth],
            handler: controller.removeFromWishList
        },

    },
]