const router = require('express').Router();
const internshipController = require('../controllers/internship');
const loginRequired = require('../middlewares/loginRequired');

router.post("/", loginRequired, internshipController.create);
router.get("/", loginRequired, internshipController.findAll);
router.get("/:id", loginRequired, internshipController.findOne);
router.put("/:id", loginRequired, internshipController.update);
router.delete("/:id", loginRequired, internshipController.delete);

module.exports = router;