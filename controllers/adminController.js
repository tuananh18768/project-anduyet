require("dotenv").config();
const Admin = require("../models/adminAuth");
const Users = require("../models/userAuth");
const Trainers = require("../models/tranierAuth");
const Category = require("../models/catergories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const Categories = require("../models/catergories");
const Skills = require("../models/skillModel");
const Discovery = require("../models/discovery");
const NewPostDiscovery = require("../models/newPostDiscovery");
const BmiModel = require("../models/bmiModel");
const Tutorial = require("../models/classModel");
const RegisterTutorial = require("../models/registerCourseModel");
const Courses = require("../models/coursesModel");

const { CLIENT_URL } = process.env;
const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email." });
            }
            // const user = await Admin.findOne({ email });
            // if (user)
            //     return res.status(400).json({ msg: "This email already exists." });
            // if (password.length < 6) {
            //     return res
            //         .status(400)
            //         .json({ msg: "Password must be at least 6 characters." });
            // }
            const passwordHash = await bcrypt.hash(password, 12);
            
            const admin = new Admin({
                name,
                email,
                password: passwordHash,
            });
            await admin.save();
            res.json({
                msg: "Register Success! email to start.",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // activateEmail: async(req, res) => {
    //     try {
    //         const { activation_token } = req.body;
    //         const user = jwt.verify(
    //             activation_token,
    //             process.env.ACTIVATION_TOKEN_SECRET
    //         );
    //         const { name, email, password } = user;
    //         const check = await Admin.findOne({ email });
    //         if (check)
    //             return res.status(400).json({ msg: "This email is alread exits." });

    //         const newUser = new Admin({
    //             name,
    //             email,
    //             password,
    //         });
    //         await newUser.save();
    //         res.json({ msg: "Account has been activated!" });
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },
    activateEmailTrainer: async(req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET
            );
            const { name, email, password, experience, skills, graduate } = user;
            const check = await Trainers.findOne({ email });
            if (check)
                return res.status(400).json({ msg: "This email is alread exits." });

            const newUser = new Trainers({
                name,
                email,
                password,
                experience,
                skills,
                graduate,
            });
            await newUser.save();
            res.json({ msg: "Account trainer has been activated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Admin.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/admin/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            res.json({ msg: "Login success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

            jwt.verify(rf_token, process.env.REFERSH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" });

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const { email } = req.body;
            const user = await Admin.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email dose not exits." });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

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

            await Admin.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Admin.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createUser: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);
            
            const user = new Users({
                name,
                email,
                password: passwordHash,
            });
            await user.save();
            res.json({
                msg: "Create user Success!.",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createTraner: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);
            
            const trainer = new Trainers({
                name,
                email,
                password: passwordHash,
            });
            await trainer.save();
            res.json({
                msg: "Create trainer Success!.",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllUsers: async(req, res) => {
        try {
            const users = await Users.find().select("-password");
            res.json(users);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTrainer: async(req, res) => {
        try {
            const trainers = await Trainers.find().select("-password");
            res.json(trainers);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/admin/refresh_token" });
            return res.json({ msg: "Logout!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar } = req.body;
            const user = await Admin.findById(req.user.id).select("-password");
            await Admin.findByIdAndUpdate({ _id: req.user.id }, {
                name,
                avatar: avatar || user.avatar,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    // updatePasswordTrainer: async(req, res) => {
    //     try {
    //         const { password } = req.body;
    //         const passwordHash = await bcrypt.hash(password, 12);

    //         await Trainers.findOneAndUpdate({ _id: req.params.id }, {
    //             password: passwordHash,
    //         });
    //         res.json({ msg: "Password successfully changed!" });
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },
    updatePasswordUser: async(req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateUserRole: async(req, res) => {
        try {
            const { role } = req.body;
            await Users.findByIdAndUpdate({ _id: req.params.id }, {
                role,
            });
            res.json({ msg: "Update successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteUser: async(req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);
            res.json({ msg: "Delete user successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // deleteTrainer: async(req, res) => {
    //     try {
    //         await Trainers.findByIdAndDelete(req.params.id);
    //         res.json({ msg: "Delete trainer successfully" });
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },
    addCategory: async(req, res) => {
        try {
            const { name, slug, parentID } = req.body;
            const category = await Categories.findOne({ name: name });

            if (category)
                return res.status(400).json({ msg: "This category dose already." });

            const newCate = new Categories({
                name,
                slug,
                parentID,
                manger_cate: req.user.id,
            });
            await newCate.save();
            res.json({ msg: "Categories add successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateCategory: async(req, res) => {
        try {
            const { name } = req.body;
            const category = await Categories.findOne({ name: name });

            if (category)
                return res.status(400).json({ msg: "This category dose already." });
            await Categories.findByIdAndUpdate({ _id: req.params.id }, {
                name,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteCategory: async(req, res) => {
        try {
            await Categories.findByIdAndRemove(req.params.id);
            // const doc = await DocumentIdea.find()
            // for (let item of doc) {
            //     if (item.category.toString() === req.params.id) {
            //         console.log(item);
            //         await DocumentIdea.findByIdAndDelete(item._id)
            //     }
            // }
            res.status(200).json({ msg: "Delete category successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllCategory: async(req, res) => {
        try {
            const data = await Categories.find();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addTutorial: async(req, res)=>{
        try {
            const { name, description, avatar_couses, result } = req.body;
            const nameCourses = await Tutorial.findOne({ name: name });
            if (nameCourses)
                return res.status(400).json({ msg: "This tutorial dose already." });

            const newTutorial = new Tutorial({
                name,
                description,
                linkName: formartLinkName(name),
                avatar_couses,
                admin_create: req.user.id,
                result,
            });
            newTutorial.save();
            res.status(200).json({ msg: "Add Tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateTutorial: async(req, res)=>{
        try {
            const { name, description, avatar_couses, result } = req.body;
            const tutorialParams = await Tutorial.findById(req.params.id);
            await Tutorial.findByIdAndUpdate(req.params.id, {
                name: name || tutorialParams.name,
                description: description || tutorialParams.description,
                linkName: formartLinkName(name) || formartLinkName(tutorialParams.name),
                avatar_couses: avatar_couses || tutorialParams.avatar_couses,
                result: result || tutorialParams.result,
            });
            res.json({ msg: "Update tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTutorial: async(req, res)=>{
        try {
            const tutorial = await Tutorial.find({ admin_create: req.user.id });
            let arrayTutorial = [];
            arrayTutorial = await Promise.all(
                tutorial.map(async(current) => {
                    return {...current._doc };
                })
            );
            res.status(200).json(arrayTutorial);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTutorial: async(req, res)=>{
        try {
            await Tutorial.findByIdAndRemove(req.params.id);
            const courses = await Courses.find();
            for (let item of courses) {
                if (item.tutorials === req.params.id) {
                    await Courses.findByIdAndDelete(item._id);
                }
            }
            res.status(200).json({ msg: "Deleted tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addCourses: async(req, res)=>{

    },
    updateCourses: async(req, res)=>{

    },
    deleteCourses: async(req, res)=>{

    },
    getAllCoursesTutorial: async(req, res)=>{

    },
    getAllCourses: async(req, res)=>{

    },
    
    addSkill: async(req, res) => {
        try {
            const { name, category_skill } = req.body;
            const categorySkill = await Skills.findOne({ name: name });

            if (categorySkill)
                return res.status(400).json({ msg: "This category dose already." });

            const newCate = new Skills({
                name,
                manger_cate: req.user.id,
                category_skill
            });
            await newCate.save();
            res.json({ msg: "Categories of skill add successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllCategoryOfSkill: async(req, res) => {
        try {
            const data = await Skills.find();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addDiscovery: async(req, res) => {
        try {
            const { name } = req.body;
            const nameDis = await Discovery.findOne({ name: name });
            if (nameDis) {
                return res.status(400).json({ msg: "Name discovery is already!!!" });
            }
            const newDis = new Discovery({
                name,
            });
            newDis.save();
            res.status(200).json({ msg: "Add discovery successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addPostIntoDis: async(req, res) => {
        try {
            const { title, description, discovery } = req.body;

            let filesArray = [];
            req.files.forEach((element) => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                    fileSize: fileSizeFormatter(element.size, 2),
                };
                filesArray.push(file);
            });

            const newPostDis = new NewPostDiscovery({
                title,
                description,
                discovery,
                admin_id: req.user.id,
                imagePost: filesArray,
            });
            newPostDis.save();
            res.status(200).json({ msg: "Add new post discovery successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addBMI: async(req, res) => {
        try {
            const newBMI = new BmiModel({
                results: req.body.result,
                suggest: [req.body.resultSugget],
                typeBMI: req.body.type,
            });
            const Bmi = await newBMI.save();
            res.status(200).json(Bmi);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    dashboard: async(req, res) => {
        try {
            const user = await Users.find();
            const trainer = await Trainers.find();
            const category = await Category.find();
            const tutorial = await Tutorial.find();
            let allRegister = await RegisterTutorial.find();

            let dataTrainer = await Promise.all(
                trainer.map(async(e) => {
                    const tutorialTrainer = await Tutorial.find({ trainer_id: e._id });
                    const courses = await Course.find({ trainer_id: e._id });
                    return {...e._doc, tutorialTrainer, courses };
                })
            );

            let dataTutorial = await Promise.all(
                tutorial.map(async(e) => {
                    const courses = await Course.find({ tutorials: e._id });
                    return {...e._doc, courses };
                })
            );

            let dataCate = await Promise.all(
                category.map(async(e) => {
                    const cateTutorial = await Tutorial.find({ category: e._id });
                    return {...e._doc, cateTutorial };
                })
            );

            const uniqueIds = [];
            const dataRegister = allRegister.filter((element) => {
                const isDuplicate = uniqueIds.includes(element.users.toString());

                if (!isDuplicate) {
                    uniqueIds.push(element.users.toString());

                    return true;
                }

                return false;
            });

            let dataLearn = await Promise.all(
                user.map(async(e) => {
                    const cateTutorial = await RegisterTutorial.find({ users: e._id });
                    return {...e._doc, cateTutorial };
                })
            );

            const dashboard = {
                user,
                dataTrainer,
                dataCate,
                dataTutorial,
                dataLearn,
                dataRegister,
            };
            res.status(200).json(dashboard);
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

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
    );
};
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const createAtivationToken = (payload) => {
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

module.exports = userController;