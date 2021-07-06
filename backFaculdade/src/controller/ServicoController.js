// Modules
const Servico = require('../models/Servico');
const Empresa = require('../models/Empresa');

module.exports = {
    async listar(req, res) {
        try {
            const empresa = await Empresa.findAll({ include: { association: 'servicos', through: { attributes: [] } } });

            return res.status(200).json(empresa);
        } catch (error) {
            console.log(error)
        }
    },
    async cadastro(req, res) {
        try {
            const { empresaId } = req.params;
            const servicoReq = req.body;

            const empresa = await Empresa.findByPk(empresaId);

            if (!empresa) {
                return res.status(400).json({ error: 'Empresa não encontrada.' });
            }

            const [servico] = await Servico.findOrCreate({
                where: {
                    nome: servicoReq.nomeDoServico,
                    descricao: servicoReq.descricaoServico,
                    linkImg: servicoReq.linkImg
                }
            });

            await empresa.addServico(servico);

            return res.status(200).json({ message: 'Servico cadastrado com sucesso.' });

        } catch (error) {
            console.log(error);
        }
    }
}