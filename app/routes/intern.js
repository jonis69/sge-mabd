const router = require('express').Router();
const internController = require('../controllers/intern');
const loginRequired = require('../middlewares/loginRequired');

router.post("/", loginRequired, internController.create);
router.get("/", loginRequired, internController.findAll);
router.get("/:id", loginRequired, internController.findOne);
router.put("/:id", loginRequired, internController.update);
router.delete("/:id", loginRequired, internController.delete);

module.exports = router;