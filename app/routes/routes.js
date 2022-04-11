const router = require('express').Router();

// rotas da aplicação

// ---------- Estagiários ----------
const internRouter = require('./intern');
router.use('/interns', internRouter);
// ---------- Convênios ----------
const agreementRouter = require('./agreement');
router.use('/agreements', agreementRouter);
// ---------- Estágios ----------
const internshipRouter = require('./internship');
router.use('/internships', internshipRouter);

module.exports = router;