const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            razaoSocial: DataTypes.STRING,
            cnpj: DataTypes.STRING,
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
            tableName: 'empresas',
            timestamps: true,
        })
    }

    static associate(models) {
        this.belongsToMany(models.Servico, { foreignKey: 'empresaId', through: 'empresaServicos', as: 'servicos' })
    }
}

module.exports = Empresa;