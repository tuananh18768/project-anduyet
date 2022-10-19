const router = require("express").Router();
const trainerController = require("../controllers/trainerController");
const auth = require("../middleware/auth");
const authTrainer = require("../middleware/authTrainer");

router.post("/login", trainerController.login);

router.post("/refresh_token", trainerController.getAccessToken);

router.post("/forgot", trainerController.forgotPassword);

router.post("/reset", auth, trainerController.resetPassword);

router.get("/infor", auth, trainerController.getUserInfor);

router.get("/logout", trainerController.logout);

router.patch("/update_infor", auth, trainerController.updateInfor);

router.post("/create_class", auth, authTrainer, trainerController.addClass);

router.put(
    "/update_class/:id",
    auth,
    authTrainer,
    trainerController.updateClass
);

router.get(
    "/getAll_class",
    auth,
    authTrainer,
    trainerController.getAllClass
);


module.exports = router;