// Modules
const bcrypt = require('bcryptjs');

// Models
const Empresa = require('../models/Empresa.js');

// DTO
const EmpresaDTO = require('../dto/Empresa.js');

// Utils
const JWT = require('../utils/jwt');
const responses = require('../utils/responses');

module.exports = {
    async login(req, res) {
        try {
            const empresaDTO = new EmpresaDTO(req.body);
            let response, token = null,
                auth = false;

            if (empresaDTO.camposParaLogin()) {
                let empresaEncontrada = await Empresa.findOne({
                    where: {
                        email: empresaDTO.email
                    }
                });
                
                if (empresaEncontrada) {
                    const hash = empresaEncontrada.senha.trim();


                    let checkPasswordPromise = new Promise(async resolve => {
                        await bcrypt.compare(empresaDTO.senha, hash, async function (err, res) {
                            if (err) resolve(responses.build(500, 'Falha ao fazer login'));
                            else {
                                if (res) {
                                    empresaEncontrada = empresaEncontrada.toJSON();
                                    //Voltar algumas informações caso precise no front, porém tomar cuidado com quais informações estão voltando
                                    // verificar não posso enviar esses dados para o front

                                    let empresaID = empresaEncontrada.id;

                                    token = await JWT.generateJWT({
                                        email: empresaEncontrada.email,
                                        nome: empresaEncontrada.nome
                                    });

                                    resolve(responses.build(200, 'Login efetuado com sucesso', [{
                                        token,
                                        auth: token ? true : false,
                                        empresaID
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
    },
    async listar(req, res) {
        try {
            const empresa = await Empresa.findAll();

            return res.json(empresa);
        } catch (error) {
            console.log(error);
        }
    },
    async cadastro(req, res) {
        try {
            const empresaDTO = new EmpresaDTO(req.body);
            let response;

            if (empresaDTO.camposParaCadastro()) {
                const hash = await bcrypt.hash(empresaDTO.senha, 10);

                const empresaEncontrada = await Empresa.findOne({
                    where: {
                        email: empresaDTO.email
                    }
                });

                if (!empresaEncontrada) {
                    await Empresa.create({
                        razaoSocial: empresaDTO.razaoSocial,
                        cnpj: empresaDTO.cnpj,
                        email: empresaDTO.email,
                        celular: empresaDTO.celular,
                        endereco: empresaDTO.endereco,
                        cidade: empresaDTO.cidade,
                        estado: empresaDTO.estado,
                        bairro: empresaDTO.bairro,
                        cep: empresaDTO.cep,
                        senha: hash.trim()
                    }).then(async empresaCriada => {
                        if (empresaCriada) {
                            empresaCriada = empresaCriada.toJSON();
                            delete empresaCriada.senha;

                            if (empresaCriada) {
                                response = responses.build(200, 'Empresa cadastrada com sucesso');
                            } else response = responses.build(500, 'Falha ao cadastrar empresa');
                        } else response = responses.build(500, 'Falha ao cadastrar empresa');
                    });
                } else response = responses.build(400, 'Essa empresa já está cadastrada');
            } else response = responses.getDefault(400);

            return res.json(response);

            // const empresa = await Empresa.create({ razaoSocial, cnpj, email, celular, endereco, cidade, estado, bairro, cep, senha });

            // return res.json(empresa);

        } catch (error) {
            console.log(error);
            return res.json(responses.build(500, 'Falha ao cadastrar empresa'))
        }
    }
}