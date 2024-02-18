const prisma = require("../DB/DbConfig");

// create catagory
const createCatagory = async (req, h) => {
    try {
        const adminId = req.adminId;
        if (!adminId) {
            return h.response({ succcess: false, message: "You are not an admin" }).code(404);
        }

        const { catagoryName } = req.payload;
        if (!catagoryName) {
            return h.response({ succcess: false, message: "Please enter a catagory name" }).code(404);
        }

        const checkCatagory = await prisma.catagory.findFirst({
            where: {
                catagoryName: catagoryName,
            }
        });

        if (checkCatagory) {
            return h.response({ success: false, message: "catagory already exists!" })
        } else {
            const storCatagory = await prisma.catagory.count({
                data: {
                    catagoryName: catagoryName,
                }
            });
            return h.response({ succcess: true, message: "Catagory created successfully", data: storCatagory }).code(201);
        }
    } catch (error) {
        console.log(error);
        return h.response({ succcess: false, message: "Internal Server Error", error })
    }
}

module.exports = {
    createCatagory
}