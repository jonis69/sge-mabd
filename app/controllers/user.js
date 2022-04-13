const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BadRequest, Unauthorized, NotFound } = require('../config/errors');
const User = db.users;

// Criar um user

exports.create = async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    });
    // gerar o salt para hashear a senha

    const salt = await bcrypt.genSalt(10);

    // agora a senha do usuário será a senha com hash
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
};

exports.login = async (req, res, next) => {
    try {
        // Pegando email e senha (valor padrão = vazio)
        
        const { email = "", password = "" } = req.body; 

        if (!email || !password) {
            return res.status(401).send({ message: "usuário ou senha inválidos" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            //throw new Unauthorized();
            return res.status(401).send({ message: "user não existe" })
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {

            const { id } = user;
            const token = jwt.sign({ id, email }, process.env.SECRET_TOKEN, {

            // Enviando id e email como payload + chave secreta
            expiresIn: process.env.TOKEN_EXPIRATION,
        });
            res.json({
                token: token,
                user: { id, name: user.name, email },
            });

        } else {
            res.status(400).json({ error: "Senha inválida" });
        }
        
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const getUser = req.body;
        const user = await User.findOne({ email: getUser.email });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const salt = await bcrypt.genSalt(10);
        getUser.password = await bcrypt.hash(getUser.password, salt);

        await user.updateOne({ password: getUser.password });
        return res.status(201).send({ message: "ok" });
    } catch (err) {
        return res
            .status(400)
            .send({ message: "Algo deu errado ao tentar redefinir a senha" });
    }
};

// Buscar todos os usuários
exports.findAll = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send({
            message: "Algum erro ocorreu ao tentar encontrar os usuários",
        });
    }
};

// Buscar um usuário
exports.findOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .send({ message: "Faltando campo necessário: User ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: "Recurso não encontrado: Usuário não existe", });
        }

        return res.json(user);
    } catch (err) {
        next(err);
    }
};

// Atualizar um usuário
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .send({ message: "Faltando campo necessário: User ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .send({
                    message: "Recurso não encontrado: Usuário não existe",
                });
        }

        await user.updateOne(req.body);

        return res.status(204).json();
    } catch (err) {
        next(err);
    }
};

// Deletar um usuário
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .send({ message: "Faltando campo necessário: User ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .send({
                    message: "Recurso não encontrado: Usuário não existe",
                });
        }

        await user.delete();

        return res.status(201).send({ message: "ok" });
    } catch (err) {
        next(err);
    }
};
