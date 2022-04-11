const db = require("../models");
const Internship = db.internships;
//const Adress = db.addresses;


// Criar um estágio
exports.create = async (req, res, next) => { 
    try {
        await Internship.create({
             // fazer foreign key dps
             name: req.body.name,
             advisor: req.body.advisor,
             supervisor: req.body.supervisor,
             salary_amount: req.body.salary_amount,
             start_date: req.body.start_date,
             end_date: req.body.end_date,
             report_date: req.body.report_date,
             // fazer foreign key dps
             agreement: req.body.agreement

        });

        return res.status(201).json({ status: 'ok' });

    } catch(err) {
        res.status(500).send({ message: "Algo deu errado ao criar um estágio" })
    }
    
  
};

// Encontrar todos os estágios da base de dados.
exports.findAll = async (req, res, next) => {
    try{ 
        const internships = await Internship.find();
        res.json(internships)

    }catch (err) {
        res.status(500).send({ message: "Algum erro ocorreu ao tentar encontrar os estágios" })
    }
  
};
// Encontrar um estágio
exports.findOne = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: internship ID' });
        }

        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estágio não existe' });
        }
        
        return res.json(internship);
    }   catch (err) {
        next(err);
    }
};
// Atualizar um estágio
exports.update = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: internship ID' });
        }

        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estágio não existe' });
        }

        await internship.updateOne(req.body);
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};
// Deletar um estágio
exports.delete = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: internship ID' });
        }

        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).send({ message: 'Recurso não encontrado: Estágio não existe' });
        }

        await internship.delete();
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};