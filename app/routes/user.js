const router = require('express').Router();
const userController = require('../controllers/user');

router.post("/signup", userController.create);
router.post("/login", userController.login);
router.put("/resetPassword", userController.resetPassword);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;