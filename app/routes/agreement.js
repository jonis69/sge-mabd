const router = require('express').Router();
const agreementController = require('../controllers/agreement');

router.post("/", agreementController.create);
router.get("/", agreementController.findAll);
router.get("/:id", agreementController.findOne);
router.put("/:id", agreementController.update);
router.delete("/:id", agreementController.delete);

module.exports = router;