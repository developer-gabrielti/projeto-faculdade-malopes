'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('usuarios', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            celular: {
                type: Sequelize.STRING,
                allowNull: false
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estado: {
                type: Sequelize.STRING(2),
                allowNull: false
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cep: {
                type: Sequelize.STRING,
                allowNull:false
            },
            senha: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('usuarios');

    }
};