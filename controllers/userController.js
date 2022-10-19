const Users = require("../models/userAuth");
const Tutorial = require("../models/classModel");
const RegisterCourese = require("../models/registerCourseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const Courses = require("../models/coursesModel");
const Categories = require("../models/catergories");
const TrainerModel = require("../models/tranierAuth");
const RegisterModel = require("../models/registerCourseModel");
const Discovery = require("../models/discovery");
const NewPostDiscovery = require("../models/newPostDiscovery");
const bmiModel = require("../models/bmiModel");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userController = {
    
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 100, //7day
            });
            res.json({ msg: "Login success" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(500).json({ msg: "Please login now" });

            jwt.verify(rf_token, process.env.REFERSH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(500).json({ msg: "Please login now" });

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email dose not exits." });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            res.json({ msg: "Re-send the password, please check your email." });
        } catch {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
            return res.json({ msg: "Logout!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar } = req.body;
            const userParams = await Users.findById(req.user.id).select("-password");
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                name: name || userParams.name,
                avatar: avatar || userParams.avatar,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFERSH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
module.exports = userController;