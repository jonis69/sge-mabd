const db = require("../models");
const Agreement = db.agreements;
//const Adress = db.addresses;


// Criar um convênio
exports.create = async (req, res, next) => { 
    try {
        await Agreement.create({
            company_name: req.body.company_name,
            cnpj: req.body.cnpj,
            email: req.body.email,
            phone: req.body.phone,
            business_nature: req.body.business_nature,
            start_date: req.body.start_date,
            end_date: req.body.end_date

        });

        return res.status(201).json({ status: 'ok' });

    } catch(err) {
        res.status(500).send({ message: "Algo deu errado ao criar um convênio" })
    }
    
  
};

// Encontrar todos os convênios da base de dados.
exports.findAll = async (req, res, next) => {
    try{ 
        const agreements = await Agreement.find();
        res.json(agreements)

    } catch (err) {
        res.status(500).send({ message: "Algum erro ocorreu ao tentar encontrar os convênios" })
    }
};
// Encontrar um convênio
exports.findOne = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: Agreement ID' });
        }

        const agreement = await Agreement.findById(id);

        if (!agreement) {
            return res.status(404).send({ message: 'Recurso não encontrado: Convênio não existe' });
        }
        
        return res.json(agreement);
    }   catch (err) {
        next(err);
    }
};
// Atualizar um convênio
exports.update = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: Agreement ID' });
        }

        const agreement = await Agreement.findById(id);

        if (!agreement) {
            return res.status(404).send({ message: 'Recurso não encontrado: Convênio não existe' });
        }

        await agreement.updateOne(req.body);
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};
// Deletar um convênio
exports.delete = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: Agreement ID' });
        }

        const agreement = await Agreement.findById(id);

        if (!agreement) {
            return res.status(404).send({ message: 'Recurso não encontrado: Convênio não existe' });
        }

        await agreement.delete();
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};