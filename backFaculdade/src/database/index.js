const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario.js');
const Empresa = require('../models/Empresa.js');
const Servico = require('../models/Servico.js');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Empresa.init(connection);
Servico.init(connection);

Servico.associate(connection.models);
Empresa.associate(connection.models);

module.exports = connection;