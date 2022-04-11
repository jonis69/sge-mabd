const router = require('express').Router();
const internshipController = require('../controllers/internship');

router.post("/", internshipController.create);
router.get("/", internshipController.findAll);
router.get("/:id", internshipController.findOne);
router.put("/:id", internshipController.update);
router.delete("/:id", internshipController.delete);

module.exports = router;