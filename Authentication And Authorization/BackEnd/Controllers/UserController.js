const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSignupSchema = Joi.object({
    FirstName: Joi.string().min(2).max(50).required(),
    LastName: Joi.string().min(2).max(50).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(5).required(),
    PhoneNumber: Joi.string().required(),
    isActive: Joi.boolean().default(true),
});

exports.UserSignup = async (req, res) => {
    try {
        const { error, value } = userSignupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, msg: 'Validation failed', errors: error.details });
        }
        const { FirstName, LastName, Email, Password, PhoneNumber } = value;
        const checkUser = await User.findOne({ Email: Email });
        if (!checkUser) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

            const userCreated = new User({ FirstName, LastName, Email, Password: hashedPassword, PhoneNumber });
            await userCreated.save();
            return res.status(200).json({ success: true, msg: 'User has been registered. You can log in here :)' });
        } else {
            return res.status(400).json({ success: false, msg: 'User already registered with this email. Try another email.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Internal Server Error', error });
    }
};

exports.UserLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const checkUser = await User.findOne({ Email: Email });
        if (checkUser) {
            if (!checkUser.isActive) {
                return res.status(201).json({ success: false, msg: 'Your account is not active. Please contact support.' });
            }
            // check bcrypt password with your enter password
            const isPasswordValid = await bcrypt.compare(Password, checkUser.Password);
            if (isPasswordValid) {
                const token = jwt.sign({ token: checkUser }, 'SecretKey');
                return res.status(200).json({ success: true, msg: 'Login successfully', token: token });
            } else {
                return res.status(201).json({ success: false, msg: 'Invalid password Try Again' });
            }
        } else {
            return res.status(201).json({ success: false, msg: 'Invalid Email You have To Signup First' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Internal Server Error', error });
    }
}

// exports.GetAllUser = async (req, res) => {
//     try {
//         const { page = 1, pageSize = 2 } = req.query;
//         const count = await User.countDocuments();
//         const skip = (page - 1) * pageSize;
//         const getalluser = await User.find()
//             .skip(skip)
//             .limit(parseInt(pageSize));
//         if (getalluser) {
//             return res.status(200).json({
//                 success: true,
//                 msg: "Your all user here",
//                 getalluser: getalluser,
//                 totalPages: Math.ceil(count / pageSize),
//                 currentPage: parseInt(page),
//             });
//         } else {
//             return res.status(404).json({ success: false, msg: "No User Found" });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, error });
//     }
// }

exports.GetAllUser = async (req, res) => {
    try {
        const { page = 1, pageSize = 2, status } = req.query;
        let filter = {};
        if (status === 'Active') {
            filter.isActive = true;
        } else if (status === 'Inactive') {
            filter.isActive = false;
        }
        const count = await User.countDocuments(filter);
        const skip = (page - 1) * pageSize;
        const getalluser = await User.find(filter)
            .skip(skip)
            .limit(parseInt(pageSize));

        if (getalluser) {
            return res.status(200).json({
                success: true,
                msg: "Your users here",
                getalluser: getalluser,
                totalPages: Math.ceil(count / pageSize),
                currentPage: parseInt(page),
            });
        } else {
            return res.status(404).json({ success: false, msg: "No User Found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
}


exports.deleteuser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deleteuser = await User.findByIdAndRemove({ _id: userId })
        if (deleteuser) {
            return res.status(200).json({ success: true, msg: "User has been deleted" })
        }
        else {
            return res.status(400).json({ success: false, msg: "You Can not delete this user" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal error", error })
    }
}

exports.UserUpdate = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { FirstName, LastName, Email, PhoneNumber } = req.body;
        const existingUserWithSameEmail = await User.findOne({ Email: Email, _id: { $ne: userId } });
        if (existingUserWithSameEmail) {
            return res.status(400).json({ success: false, msg: "Email already use by another User ! " });
        }
        const updateuser = await User.findByIdAndUpdate({ _id: userId },
            {
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                PhoneNumber: PhoneNumber
            }, { new: true }
        );

        if (!updateuser) {
            return res.status(404).json({ success: false, msg: "User not eligible to update" });
        } else {
            await updateuser.save();
            return res.status(200).json({ success: true, msg: "User details have been updated" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error });
    }
};

exports.UpdateStatus = async (req, res) => {
    const _id = req.params._id;
    const { isActive } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, { isActive });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        let message = isActive ? 'User has been activated' : 'User has been deactivated';

        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


