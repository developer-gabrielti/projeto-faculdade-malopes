const { Model, DataTypes } = require('sequelize');

class Servico extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            linkImg: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'servicos',
            timestamps: true,
        })
    }

    static associate(models) {
        this.belongsToMany(models.Empresa, { foreignKey: 'servicoId', through: 'empresaServicos', as: 'empresas' })
    }
}

module.exports = Servico;