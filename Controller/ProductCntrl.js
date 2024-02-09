const prisma = require("../DB/DbConfig");

// add product
const addProduct = async (req, h) => {

    const adminId = req.adminId;
    if (!adminId) {
        return h.response({ succcess: false, message: "You are not an admin" }).code(404);
    }
    try {
        const { product_name, quantity, price } = req.payload;
        if (!product_name) {
            return h.response({ status: 404, message: "product_name is required" });
        }
        if (!quantity) {
            return h.response({ status: 404, message: "quantity is required" });
        }
        if (!price) {
            return h.response({ status: 404, message: "price is required" });
        }
        const product = await prisma.product.create({
            data: {
                product_name, quantity, price
            }
        });
        return h.response({ status: 201, msg: "product created successfully!", data: product })

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating Product" }).code(500);
    }
};

// delete a product
const deleteSingleProduct = async (req, h) => {
    try {
        const adminId = req.adminId;
        if (!adminId) {
            return h.response({ succcess: false, message: "You are not an admin" }).code(404);
        }
        const { id } = req.params;
        const checkProduct = await prisma.product.findFirst({
            where: {
                id: Number(id),
            }
        });
        if (!checkProduct) {
            return h.response({ succcess: false, message: "YProduct not found" }).code(404);
        } else {
            const deleteProductById = await prisma.product.delete({
                where: {
                    id: Number(id),
                }
            });
            return h.response({ succcess: true, message: "Product deleted successfully" }).code(200);
        }
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error deleting Product", error }).code(500);

    }
}

// get products 
const getProducts = async (req, h) => {
    try {
        const products = await prisma.product.findMany({});
        return h.response({ success: true, data: products }).code(200);
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting Products" }).code(500);
    }
}

// get a single product by id 
const getSingleProductById = async (req, h) => {
    try {
        const { id } = req.params;

        const singleProduct = await prisma.product.findFirst({
            where: {
                id: Number(id),
            }
        });
        return h.response({ sucess: true, data: singleProduct }).code(200);
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting Product by it's Id" }).code(500);
    }
}


// update product
const updateProduct = async (req, h) => {

    const adminId = req.adminId;
    if (!adminId) {
        return h.response({ succcess: false, message: "You are not an admin" }).code(404);
    }
    const { id } = req.params;

    try {
        const { product_name, quantity, price } = req.payload;
        if (!product_name) {
            return h.response({ status: 404, message: "product_name is required" });
        }
        if (!quantity) {
            return h.response({ status: 404, message: "quantity is required" });
        }
        if (!price) {
            return h.response({ status: 404, message: "price is required" });
        }
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                product_name, quantity, price
            }
        });
        return h.response({ status: 201, msg: "product updated successfully!", data: product })

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating Product" }).code(500);
    }
};

module.exports = {
    addProduct,
    getProducts,
    getSingleProductById,
    updateProduct,
    deleteSingleProduct
}