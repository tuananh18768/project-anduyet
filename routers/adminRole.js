const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const { uploadImagePost } = require("../middleware/uploadImagePost");

router.post("/register", adminController.register);

// router.post("/activation", adminController.activateEmail);

// router.post("/activation_trainer", adminController.activateEmailTrainer);

router.post("/login", adminController.login);

router.post("/refresh_token", adminController.getAccessToken);

router.post("/forgot", adminController.forgotPassword);

router.post("/reset", auth, adminController.resetPassword);

router.get("/infor", auth, adminController.getUserInfor);

router.post("/create_user", auth, adminController.createUser);

router.post("/create_trainer", auth, adminController.createTraner);

router.get("/getAllUser", auth, authAdmin, adminController.getAllUsers);

router.get("/getAllTraner", auth, authAdmin, adminController.getAllTrainer);

router.get("/logout", adminController.logout);

router.patch("/update_infor", auth, authAdmin, adminController.updateInfor);

// router.patch(
//     "/update_passwordTrainer/:id",
//     auth,
//     authAdmin,
//     adminController.updatePasswordTrainer
// );
router.patch(
    "/update_passwordUser/:id",
    auth,
    authAdmin,
    adminController.updatePasswordUser
);

// router.patch('/update_role/:id', auth, authAdmin, adminController.updateUserRole)

router.delete("/delete_user/:id", auth, authAdmin, adminController.deleteUser);

// router.delete(
//     "/delete_trainer/:id",
//     auth,
//     authAdmin,
//     adminController.deleteTrainer
// );

router.post("/add_category", auth, authAdmin, adminController.addCategory);

router.put(
    "/update_category/:id",
    auth,
    authAdmin,
    adminController.updateCategory
);

router.delete(
    "/delete_category/:id",
    auth,
    authAdmin,
    adminController.deleteCategory
);

router.get("/get_allCate", auth, authAdmin, adminController.getAllCategory);


router.post("/add_toturial", auth, authAdmin, adminController.addTutorial);

router.put(
    "/update_tutorial/:id",
    auth,
    authAdmin,
    adminController.updateTutorial
);

router.get(
    "/getAll_tutorial",
    auth,
    authAdmin,
    adminController.getAllTutorial
);

router.delete(
    "/delete_tutorial/:id",
    auth,
    authAdmin,
    adminController.deleteTutorial
);

router.post(
    "/add_courses/:id",
    auth,
    authAdmin,
    adminController.addCourses
);

router.put(
    "/update_courses/:id",
    auth,
    authAdmin,
    adminController.updateCourses
);

router.delete(
    "/delete_courses/:id",
    auth,
    authAdmin,
    adminController.deleteCourses
);

router.get(
    "/getCourses_tutorial/:id",
    auth,
    authAdmin,
    adminController.getAllCoursesTutorial
);

router.get(
    "/getAll_courses",
    auth,
    authAdmin,
    adminController.getAllCourses
);


// router.post("/add_discovery", auth, authAdmin, adminController.addDiscovery);

// router.post(
//     "/add_newPost",
//     auth,
//     authAdmin,
//     uploadImagePost.array("file", 12),
//     adminController.addPostIntoDis
// );
// router.post("/add_BMI/", auth, authAdmin, adminController.addBMI);

router.get("/dashboard/", auth, authAdmin, adminController.dashboard);

module.exports = router;