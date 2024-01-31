const prisma = require("../DB/DbConfig");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

// add admin 
const createAdmin = async (req, h) => {
    try {
        const { admin_name, email, password, mobile } = req.payload;
        if (!admin_name) {
            return h.response({ status: 404, message: "admin_name is required" });
        }
        if (!email) {
            return h.response({ status: 404, message: "email is required" });
        }
        if (!password) {
            return h.response({ status: 404, message: "passsword is required" });
        }
        if (!mobile) {
            return h.response({ status: 404, message: "Mobile is required" });
        }

        const preAdmin = await prisma.Admin.findFirst({
            where: {
                email
            }
        });
        if (preAdmin) {
            return h.response({ status: 400, message: "admin_name already exists" });
        } else {
            // hash password 
            const hashedPassword = await bcrypt.hash(password, 10);

            const adminData = await prisma.Admin.create({
                data: {
                    admin_name,
                    email,
                    password: hashedPassword,
                    mobile
                }
            });

            return h.response({ status: 201, msg: "Admin created successfully!", data: adminData })
        }
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating Admin" }).code(500);
    }
}

// admin login
const adminLogin = async (req, h) => {
    try {
        const { email, password } = req.payload;
        if (!email) {
            return h.response({ status: 404, message: "Please enter your email" }).code(404);
        }
        if (!password) {
            return h.response({ status: 404, message: "Please enter your password" }).code(404);
        }

        const admin = await prisma.Admin.findFirst({
            where: {
                email
            }
        });


        if (!admin) {
            return h.response({ status: 404, message: "Admin not found" }).code(404);
        } else {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return h.response({ message: "Invalid password" });
            } else {
                const token = jwt.sign({ email: admin.email }, SECRET, {
                    expiresIn: "1d"
                })
                return h.response({ status: 200, message: "Sucessfully sign-in", data: admin, token: token });
            }
        }


    } catch (error) {
        console.log(error);
        return h.response({ status: 500, message: "Error while login Admin" }).code(500);
    }
}


module.exports = {
    createAdmin,
    adminLogin
}