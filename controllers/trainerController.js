const Trainers = require("../models/tranierAuth");
const Courses = require("../models/coursesModel");
const Class = require("../models/classModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const sendMailAccept = require("./sendMailAccept");
const Category = require("../models/catergories");
const RegisterClass = require("../models/registerCourseModel");
const User = require("../models/userAuth");

const { CLIENT_URL } = process.env;

const trainerController = {
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Trainers.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/trainer/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 100, //7day
            });
            res.json({ msg: "Login success" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
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
            const user = await Trainers.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email dose not exits." });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/trainer/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            res.json({ msg: "Re-send the password, please check your email." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Trainers.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Trainers.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/trainer/refresh_token" });
            return res.json({ msg: "Logout!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar, experience, skills, graduate } = req.body;
            const user = await Trainers.findById(req.user.id).select("-password");
            await Trainers.findByIdAndUpdate({ _id: req.user.id }, {
                name: name || user.name,
                avatar: avatar || user.avatar,
                experience: experience || user.experience,
                skills: skills || user.skills,
                graduate: graduate || user.graduate,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addClass: async(req, res) => {
        try {
            const { name, description, avatar_couses } = req.body;
            const nameCourses = await Class.findOne({ name: name });
            if (nameCourses)
                return res.status(400).json({ msg: "This class dose already." });

            const newclass = new Class({
                name,
                description,
                linkName: formartLinkName(name),
                avatar_couses,
                trainer_id: req.user.id,
            });
            newclass.save();
            res.status(200).json({ msg: "Add class successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateClass: async(req, res) => {
        try {
            const { name, description, avatar_couses, category, result } = req.body;
            const classParams = await Class.findById(req.params.id);
            await Class.findByIdAndUpdate(req.params.id, {
                name: name || classParams.name,
                description: description || classParams.description,
                linkName: formartLinkName(name) || formartLinkName(classParams.name),
                avatar_couses: avatar_couses || classParams.avatar_couses,
                category: category || classParams.category,
                result: result || classParams.result,
            });
            res.json({ msg: "Update class successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllClass: async(req, res) => {
        try {
            const classs = await Class.find({ trainer_id: req.user.id });
            // let arrayClass = [];
            // arrayClass = await Promise.all(
            //     classs.map(async(current) => {
            //         const cate = await Category.findById(current.category);
            //         return {...current._doc, category: cate.name };
            //     })
            // );
            res.status(200).json(classs);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
   
    
};

const formartLinkName = (name) => {
    name = name.trim();
    const arrayName = [];
    let index;
    for (let i = 0; i < name.length; i++) {
        if (index && name[index + 1] == " ") {
            index = i;
            continue;
        }
        if (name[i] != " ") {
            let vnToEng = name[i];
            vnToEng = vnToEng.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            vnToEng = vnToEng.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            vnToEng = vnToEng.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            vnToEng = vnToEng.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            vnToEng = vnToEng.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            vnToEng = vnToEng.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            vnToEng = vnToEng.replace(/đ/g, "d");
            vnToEng = vnToEng.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            vnToEng = vnToEng.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            vnToEng = vnToEng.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            vnToEng = vnToEng.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            vnToEng = vnToEng.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            vnToEng = vnToEng.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            vnToEng = vnToEng.replace(/Đ/g, "D");
            arrayName.push(vnToEng);
        } else {
            arrayName.push("-");
            index = i;
        }
    }
    return arrayName.join("");
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
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
module.exports = trainerController;