const db = require("../models");
const Intern = db.interns;


// Criar um estagiário
exports.create = async (req, res, next) => { 
    try {
        await Intern.create({
            name: req.body.name,
            cpf: req.body.cpf,
            rg: req.body.rg,
            gender: req.body.gender,
            birth_date: req.body.birth_date,
            email: req.body.email,
            phone: req.body.phone,
            student_registration: req.body.student_registration,
            period: req.body.period,
            course: req.body.course,
            shift: req.body.shift,
            cep: req.body.cep,
            state: req.body.state,
            city: req.body.city,
            district: req.body.district,
            street: req.body.street,
            home_number: req.body.home_number

        });

        return res.status(201).json({ status: 'ok' });

    } catch(err) {
        res.status(500).send({ message: "Algo deu errado ao criar um estagiário" })
    }
    
  
};

// Encontrar todos os estagiários da base de dados.
exports.findAll = async (req, res, next) => {
    try{ 
        const interns = await Intern.find();
        res.json(interns)

    }catch (err) {
        res.status(500).send({ message: "Algum erro ocorreu ao tentar encontrar os estagiários" })
    }
  
};
// Encontrar um estagiário
exports.findOne = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: Intern ID' });
        }

        const intern = await Intern.findById(id);

        if (!intern) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estagiário não existe' });
        }
        
        return res.json(intern);
    }   catch (err) {
        next(err);
    }
};
// Atualizar um estagiário
exports.update = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
           return res.status(400).send({ message: 'Faltando campo necessário: Intern ID' });
        }

        const intern = await Intern.findById(id);

        if (!intern) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estagiário não existe' });
        }

        await intern.updateOne(req.body);
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};
// Deletar um estagiário
exports.delete = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: Intern ID' });     
        }

        const intern = await Intern.findById(id);

        if (!intern) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estagiário não existe' });
        }

        await intern.delete();
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};