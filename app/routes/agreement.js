const router = require('express').Router();
const agreementController = require('../controllers/agreement');
const loginRequired = require('../middlewares/loginRequired');

router.post("/", loginRequired, agreementController.create);
router.get("/", loginRequired, agreementController.findAll);
router.get("/:id", loginRequired, agreementController.findOne);
router.put("/:id", loginRequired, agreementController.update);
router.delete("/:id", loginRequired, agreementController.delete);

module.exports = router;