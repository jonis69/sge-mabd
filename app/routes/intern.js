const router = require('express').Router();
const internController = require('../controllers/intern');

router.post("/", internController.create);
router.get("/", internController.findAll);
router.get("/:id", internController.findOne);
router.put("/:id", internController.update);
router.delete("/:id", internController.delete);

module.exports = router;