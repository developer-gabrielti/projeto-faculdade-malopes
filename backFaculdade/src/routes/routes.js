const express = require('express');
const routes = express.Router();

const UsuarioController = require('../controller/UsuarioController');
const EmpresaController = require('../controller/EmpresaController');
const ServicoController = require('../controller/ServicoController');

routes.post('/cadastrarUsuarios', UsuarioController.cadastro);
routes.post('/loginUsuario', UsuarioController.login);

routes.post('/loginEmpresa', EmpresaController.login);
routes.post('/cadastrarEmpresas', EmpresaController.cadastro);
routes.get('/listarEmpresas', EmpresaController.listar)

routes.post('/empresa/:empresaId/cadastrarServicos', ServicoController.cadastro);
routes.get('/servico/listarServicos', ServicoController.listar);


module.exports = routes;