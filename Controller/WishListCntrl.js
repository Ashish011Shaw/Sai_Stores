const prisma = require("../DB/DbConfig");

// add to wish list
const addToWishList = async (req, h) => {
    try {
        // check User first
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to add product to wish list" }).code(404);
        }
        const { id } = req.params;

        const checkProductById = await prisma.product.findFirst({
            where: {
                id: Number(id),
            }
        });
        // console.log("Product In DB : ", checkProductById);
        if (!checkProductById) {
            return h.response({ status: 404, message: "Product not found" }).code(404);
        } else {
            // check product already exists or not
            const checkwishlist = await prisma.wishlist.findFirst({
                where: {
                    product_id: Number(id),
                }
            });

            if (checkwishlist) {
                return h.response({ status: 409, message: "Product already exists in your wish list" }).code(409);
            } else {
                // add product to wish list
                const addToWishList = await prisma.wishlist.create({
                    data: {
                        user_id: Number(userId),
                        product_id: Number(id),
                    }
                });
                return h.response({ status: 200, message: "Product added successfully", data: addToWishList }).code(200)
            }

        }

    } catch (error) {
        console.log(error);
    }
}

// remove product from wish list
const removeFromWishList = async (req, h) => {
    try {
        // check User first
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to do any action" }).code(404);
        }

        const { id } = req.params;

        const checkProductByIdInWishlist = await prisma.wishlist.findFirst({
            where: {
                product_id: Number(id),
            }
        });

        if (!checkProductByIdInWishlist) {
            return h.response({ status: 404, message: "Product does not exist in your wish list" }).code(404);
        } else {
            // console.log(checkProductByIdInWishlist)
            const removeFromWishList = await prisma.wishlist.delete({
                where: {
                    id: Number(checkProductByIdInWishlist.id),
                }
            });
            return h.response({ status: 200, message: "Product removed successfully", data: removeFromWishList }).code(200)
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addToWishList,
    removeFromWishList
}