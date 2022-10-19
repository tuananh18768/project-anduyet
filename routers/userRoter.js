const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const registerCourses = require("../middleware/registerCourses");
// const authAdmin = require('../middleware/authAdmin')

router.post("/login", userController.login);

router.post("/refresh_token", userController.getAccessToken);

router.post("/forgot", userController.forgotPassword);

router.post("/reset", auth, userController.resetPassword);

router.get("/infor", auth, userController.getUserInfor);

router.get("/logout", userController.logout);

router.patch("/update_infor", auth, userController.updateInfor);

module.exports = router;