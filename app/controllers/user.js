const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.users;

// Criar um user

exports.create = async (req, res, next) => {
    
    // const body = req.body;

    // if (!(body.email && body.password)) {
    //   return res.status(400).send({ error: "Data not formatted properly" });
    // }

    const user = await User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    });
    // gerar o salt para hashear a senha

    const salt = await bcrypt.genSalt(10);
    
    // agora a senha do usuário será a senha com hash
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));

};

exports.login = async(req, res, next) => {
    try{
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        
        if (user) {
            // compara a senha fornecida com a senha com hash
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                res.status(200).json({ message: "Senha válida" });
            } else {
                res.status(400).json({ error: "Senha inválida" });
            }
        } else {
            res.status(401).json({ error: "Usuário não existe" });
        }
    } catch (err) {
        return res.status(400).send({ message: "Algo deu errado ao tentar logar"});
    }
};

exports.resetPassword = async (req, res, next) => {
    try{
        const getUser = req.body;
        const user = await User.findOne({ email: getUser.email })
        
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" })
        }

        const salt = await bcrypt.genSalt(10);
        getUser.password = await bcrypt.hash(getUser.password, salt);

        await user.updateOne({ password: getUser.password })
        return res.status(201).send({ message: "ok" });

    } catch(err) {
        return res.status(400).send({ message: "Algo deu errado ao tentar redefinir a senha"});
    }
}

// Buscar todos os usuários
exports.findAll = async (req, res, next) => {
    try{ 
        const users = await User.find();
        res.json(users)

    } catch (err) {
        res.status(500).send({ message: "Algum erro ocorreu ao tentar encontrar os usuários" })
    }
};
// Buscar um usuário
exports.findOne = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: User ID' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'Recurso não encontrado: Usuário não existe' });
        }
        
        return res.json(user);
    }   catch (err) {
        next(err);
    }
};
// Atualizar um usuário
exports.update = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: User ID' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'Recurso não encontrado: Usuário não existe' });
        }

        await user.updateOne(req.body);
        
        return res.status(204).json();
    }   catch (err) {
        next(err);
    }
};
// Deletar um usuário
exports.delete = async (req, res, next) => {
    try{ 
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Faltando campo necessário: User ID' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'Recurso não encontrado: Usuário não existe' });
        }

        await user.delete();
        
        return res.status(201).send(({ message: 'ok' }));
    }   catch (err) {
        next(err);
    }
};