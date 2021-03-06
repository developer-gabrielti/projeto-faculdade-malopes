const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            celular: DataTypes.STRING,
            endereco: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cep: DataTypes.STRING,
            senha: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'usuarios',
            timestamps: true,
        })
    }
}

module.exports = Usuario;