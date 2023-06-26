const User = require('../Models/users');
const sendMailer = require('../utility/mailer');
const auth = require('../utility/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findOne, findOneAndUpdate, find } = require('../Models/users');

exports.addUserInfo = async (req, res) => {
    try {
        const { username, email, password, phone, address} = req.body;
        let duplication = await User.findOne({email: email})
        if (duplication) {
            res.status(401).json({
                message:"email already exist"
            })
        } else {
                const hasedpassword = await bcrypt.hashSync(req.body.password, 10)
                const data = await User.create({
                username,
                email,
                phone, 
                address,
                password: hasedpassword,
            })
            data.save();
            return res.status(200).json({
                message: 'user added',
                data
            })
        }
        
            
    } catch (error) {
        res.status(500).json({
            Error_Message: error
        })
    }
};

// Find All Users
exports.getAllUser = async (req, res) => {
    try {
        let data = await User.find({role: 'user'});
        if(data) {
            res.status(200).json({
                message: 'Users are here',
                data
            })
        } else {
            res.status(404).json({
                message: 'no content'
            })
        }
    } catch (error) {
        res.status(500).json({
            Error_Message: error
        })
    }
};
// User login 
exports.userlogin = async (req, res) => {
    const { email, password } = req.body
    try {
        let data = await User.findOne({ email: email }).select('password email role phone address')
        if ( data ) {
            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                const token = jwt.sign(
                    {
                        email: req.body.email,
                        id: data._id,
                        role: data.role
                    },
                    'secret',
                    { expiresIn: "7d" }
                );
                res.status(200).json({
                    message: "login successfull",
                    data: data,
                    token
                })
            } else {
                res.status(400).json({
                    message: "invalid email or password"
                })
            }
        } else {
            res.status(400).json({
                message: "user not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
};
exports.getUserByid = async (req, res) => {
    try {
        const data = await User.findById({_id: req.params.userId})
        if(data) {
            res.status(200).json({
                message:"user data",
                data
            })
        } else {
            res.status(404).json({
                message:"data not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            Error_Message: e
        })
    }
}
// Update User Info
exports.EditUserInfo = async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.body._id })
        const email = req.body.email
        if (data && email == (undefined || null)) {
            let data1 = await User.findOneAndUpdate({ _id: req.body._id }, req.body,
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                })
            res.status(200).json({
                message: "updated data",
                data1
            });
        } else {
            res.status(400).json({
                message: 'invalid User OR Email Does bot Change'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Update Password
exports.changePassword = async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.body._id }).select("+password")
        if (data) {
            const isMatch = await bcrypt.compare(req.body.oldpassword, data.password);
            if (isMatch) {
                const hasedpassword = await bcrypt.hashSync(req.body.newpassword, 10)
                let upPassword = await User.findOneAndUpdate({ _id: req.body._id }, { $set: { "password": hasedpassword } },
                    {
                        new: true,
                        useFindAndModify: false
                    });
                res.status(200).json({
                    message: 'password changed successfully...',
                    upPassword
                })
            } else {
                res.status(400).json({
                    message: 'password doest matched'

                })
            }

        } else {
            res.status(400).json({
                message: 'invalid User'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Forget password
exports.forgetPassword = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.body.email })
        if (data) {
            const otpcode = Math.floor((Math.random() * 10000) + 1);
            await sendMailer(req.body.email, otpcode);
            let updata = await User.findOneAndUpdate({ email: req.body.email }, { $set: { 'otp': otpcode } }, {
                new: true,
                useFindAndModify: false
            })
            res.status(200).json({
                data: updata,
                message: 'Check your email..'
            })
        } else {
            res.status(400).json({
                message: "invalid eamil "
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })

    }
};
// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const data = await User.findOne({ otp: req.body.otp } && { email: req.body.email })
        if (data) {
            const hasedpassword = bcrypt.hashSync(req.body.password, 10);
            const data1 = await User.findOneAndUpdate({ email: req.body.email }, { $set: { 'password': hasedpassword } }, {
                new: true,
                useFindAndModify: false
            })
            if (data1) {
                res.status(200).json({
                    message: 'Password Changed Successfully...',
                    data1
                })
            } else {
                res.status(400).json({
                    message: 'Password Changed Failed...'
                })
            }
        } else {
            res.status(400).json({
                message: 'invalid Email OR OTP'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
}
// Delete User
exports.deleteUser = async (req, res) => {
    try {
        let data = await User.findOneAndDelete({ _id: req.body._id })
        if (data) {
            res.status(200).json({
                message: "user deleted successfully",
                data
            })
        } else {
            res.status(400).json({
                message: "user deleted failed...",
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};



