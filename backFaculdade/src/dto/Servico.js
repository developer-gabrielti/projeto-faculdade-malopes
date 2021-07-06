module.exports = class ServicoDTO {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.nome = obj.nome;
        this.descricao = obj.descricao;
    }

    camposParaCadastro() {
        return !!(this.nome && this.descricao);
    }

    camposParaApagar() {
        return !!(this.nome);
    }
}