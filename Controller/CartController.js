const prisma = require("../DB/DbConfig");

// add-to cart
const addToCart = async (req, h) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to do any action" }).code(404);
        }

        const { id } = req.params;
        const checkProductById = await prisma.product.findFirst({
            where: {
                id: Number(id),
            }
        });
        if (!checkProductById) {
            return h.response({ status: 404, message: "Product not found" }).code(404);
        } else {

            const checkCart = await prisma.cart.findFirst({
                where: {
                    product_id: Number(id)
                }
            });
            if (checkCart) {
                return h.response({ status: 409, message: "Product already exists in your cart" }).code(409);
            } else {
                const { quantity } = req.payload;
                const cartData = await prisma.cart.create({
                    data: {
                        user_id: Number(userId),
                        product_id: Number(id),
                        quantity: Number(quantity)
                    }
                });
                return h.response({ status: 201, message: "Product added to cart successfully!", data: cartData }).code(201)
            }

        }
    } catch (error) {
        console.log(error)
        return h.response({ message: "Something went wrong" }).code(500);
    }
}

// remove product from cart
const removeFromCart = async (req, h) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to do any action" }).code(404);
        }

        const { id } = req.params;

        const checkProductById = await prisma.cart.findFirst({
            where: {
                product_id: Number(id),
            }
        });
        if (!checkProductById) {
            return h.response({ status: 404, message: "Product not found in your cart" }).code(404);
        } else {
            const clearData = await prisma.cart.delete({
                where: {
                    id: Number(checkProductById.id),
                }
            });
            return h.response({ status: 200, message: "Product removed from cart successfully!", data: clearData }).code(200)
        }



    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong" }).code(500);
    }
}

// increase the quantity
const increaseQuantity = async (req, h) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to do any action" }).code(404);
        }

        const { id } = req.params;

        const checkProductById = await prisma.cart.findFirst({
            where: {
                product_id: Number(id),
            }
        });
        if (!checkProductById) {
            return h.response({ status: 404, message: "Product not found in your cart" }).code(404);
        } else {
            const increaseQuantity = await prisma.cart.update({
                where: {
                    id: Number(checkProductById.id),
                },
                data: {
                    quantity: Number(checkProductById.quantity) + 1
                }
            });
            return h.response({ status: 200, message: "Product quantity increased successfully!", data: increaseQuantity }).code(200)
        }
    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong" }).code(500);
    }
}

// decrease quantity
const decreaseQuantity = async (req, h) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to do any action" }).code(404);
        }

        const { id } = req.params;

        const checkProductById = await prisma.cart.findFirst({
            where: {
                product_id: Number(id),
            }
        });
        if (!checkProductById) {
            return h.response({ status: 404, message: "Product not found in your cart" }).code(404);
        } else {
            const decreaseQuantity = await prisma.cart.update({
                where: {
                    id: Number(checkProductById.id),
                },
                data: {
                    quantity: Number(checkProductById.quantity) - 1
                }
            });
            return h.response({ status: 200, message: "Product quantity decreased successfully!", data: decreaseQuantity }).code(200)
        }
    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong" }).code(500);
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
}