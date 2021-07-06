// Modules
const bcrypt = require('bcryptjs');

// Models
const Usuario = require('../models/Usuario');

// DTOs
const UsuarioDTO = require('../dto/Usuario');

// Utils
const responses = require('../utils/responses');
const JWT = require('../utils/jwt');

module.exports = {
    async cadastro(req, res) {
        try {
            const usuarioDTO = new UsuarioDTO(req.body);
            let response;

            if (usuarioDTO.camposParaCadastro()) {
                const hash = await bcrypt.hash(usuarioDTO.senha, 10);

                const usuarioEncontrado = await Usuario.findOne({
                    where: {
                        email: usuarioDTO.email
                    }
                });

                if (!usuarioEncontrado) {
                    await Usuario.create({
                        nome: usuarioDTO.nome,
                        cpf: usuarioDTO.cpf,
                        email: usuarioDTO.email,
                        celular: usuarioDTO.celular,
                        endereco: usuarioDTO.endereco,
                        cidade: usuarioDTO.cidade,
                        estado: usuarioDTO.estado,
                        bairro: usuarioDTO.bairro,
                        cep: usuarioDTO.cep,
                        senha: hash.trim(),
                    }).then(async usuarioCriado => {
                        if (usuarioCriado) {
                            usuarioCriado = usuarioCriado.toJSON();
                            delete usuarioCriado.senha;

                            if (usuarioCriado) {
                                response = responses.build(200, 'Usuário cadastrado com sucesso');
                            } else response = responses.build(500, 'Falha ao cadastrar usuário');
                        } else response = responses.build(500, 'Falha ao cadastrar usuário');
                    });
                } else response = responses.build(400, 'Esse usuário já está cadastrado');
            } else response = responses.getDefault(400);
            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(responses.build(500, 'Falha ao cadastrar usuário'));
        }
    },

    async login(req, res) {
        try {
            const usuarioDTO = new UsuarioDTO(req.body);
            let response, token = null,
                auth = false;

            if (usuarioDTO.camposParaLogin()) {
                let usuarioEncontrado = await Usuario.findOne({
                    where: {
                        email: usuarioDTO.email
                    }
                });

                if (usuarioEncontrado) {
                    const hash = usuarioEncontrado.senha.trim();

                    let checkPasswordPromise = new Promise(async resolve => {
                        await bcrypt.compare(usuarioDTO.senha, hash, async function (err, res) {
                            if (err) resolve(responses.build(500, 'Falha ao fazer login'));
                            else {
                                if (res) {
                                    usuarioEncontrado = usuarioEncontrado.toJSON();
                                    //Voltar algumas informações caso precise no front, porém tomar cuidado com quais informações estão voltando
                                    // verificar não posso enviar esses dados para o front
                                    token = await JWT.generateJWT({
                                        email: usuarioEncontrado.email,
                                        nome: usuarioEncontrado.nome
                                    });

                                    resolve(responses.build(200, 'Login efetuado com sucesso', [{
                                        token,
                                        auth: token ? true : false
                                    }]));
                                } else resolve(responses.build(400, 'Email ou senha incorretos'));
                            }
                        })
                    }).then(result => response = result);

                    await Promise.resolve(checkPasswordPromise);
                } else response = responses.build(404, 'Email inválido');
            } else response = responses.getDefault(400);
            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(responses.build(500, 'Falha ao fazer login'));
        }
    }
}