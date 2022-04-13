const router = require('express').Router();
const userController = require('../controllers/user');
const loginRequired = require('../middlewares/loginRequired');

router.post("/signup", userController.create);
router.post("/login", userController.login);
router.put("/resetPassword", loginRequired, userController.resetPassword);
router.get("/", loginRequired, userController.findAll);
router.get("/:id", loginRequired, userController.findOne);
router.put("/:id", loginRequired, userController.update);
router.delete("/:id", loginRequired, userController.delete);

module.exports = router;