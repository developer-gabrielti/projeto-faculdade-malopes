const express = require('express');
const routes = express.Router();

const UsuarioController = require('../controller/UsuarioController');

routes.get('/', (req, res) => {
    return res.json({ hello: "World" })
})

routes.post('/cadastro', UsuarioController.cadastro);
routes.post('/login', UsuarioController.login);

module.exports = routes;