const prisma = require("../DB/DbConfig");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

// add-customer 
const addCustomer = async (req, h) => {
    try {
        // check admin
        const adminId = req.adminId;
        // console.log(adminId)
        if (!adminId) {
            return h.response({ status: 404, message: "You are not an Admin" }).code(404);
        }

        const { name, email, password, mobile, shping_address } = req.payload;
        if (!name) {
            return h.response({ status: 404, message: "name is required" });
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
        if (!shping_address) {
            return h.response({ status: 404, message: "shping_address is required" });
        }

        const preUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (preUser) {
            return h.response({ success: false, message: "User already exists" }).code(400);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    mobile,
                    shping_address,
                    admin_id: Number(adminId)
                }
            });
            return h.response({ success: true, message: "User created", data: userData }).code(201);
        }

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating Uesr" }).code(500);
    }
}

//  user login 
const userLogin = async (req, h) => {
    try {

        const { email, password } = req.payload;
        if (!email) {
            return h.response({ status: 404, message: "Please enter your email" }).code(404);
        }
        if (!password) {
            return h.response({ status: 404, message: "Please enter your password" }).code(404);
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) {
            return h.response({ status: 404, message: "User not found" }).code(404);
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return h.response({ message: "Invalid password" });
            } else {
                const token = jwt.sign({ email: user.email }, SECRET, {
                    expiresIn: "1d"
                });
                return h.response({ status: 200, message: "Sucessfully sign-in", data: user, token: token });
            }
        }

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating Uesr" }).code(500);
    }
}

module.exports = {
    addCustomer,
    userLogin,
}