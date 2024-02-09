const prisma = require("../DB/DbConfig");

// place an order
const placeOrder = async (req, h) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return h.response({ status: 404, message: "Login first to place an order" }).code(404);
        }

        // Retrieve the user's cart items
        const cartItems = await prisma.cart.findMany({
            where: {
                user_id: userId,
            },
            include: {
                product: true,
            },
        });
        if (!cartItems.length) {
            return h.response({ status: 400, message: "Your cart is empty.Add items before placing an order" }).code(400);
        }
        console.log("MyCart", cartItems);

        // Calculate total price based on cart items
        const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        // Create an order
        const newOrder = await prisma.order.create({
            data: {
                user_id: userId,
                total_price: totalPrice,
                OrderedProducts: {
                    create: cartItems.map((item) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
            include: {
                OrderedProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        // Clear the user's cart after placing the order
        await prisma.cart.deleteMany({
            where: {
                user_id: userId,
            },
        });

        // decrease the product quantity in Product table
        // await prisma.product.update({
        //     where: {
        //         id: cartItems.map((item) => Number(item.product_id)),
        //     },
        //     data: {
        //         quantity: quantity - cartItems.map((item) => item.quantity),
        //     },
        // });
        // Decrease the product quantity in the Product table
        for (const item of cartItems) {
            await prisma.product.update({
                where: {
                    id: item.product_id,
                },
                data: {
                    quantity: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        return h.response({
            status: 201,
            message: 'Order placed successfully',
            order: newOrder,
        }).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ status: 500, message: 'Internal Server Error' }).code(500);
    }
};

module.exports = {
    placeOrder,
};
