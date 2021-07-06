module.exports = class EmpresaDTO {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.razaoSocial = obj.razaoSocial;
        this.cnpj = obj.cnpj;
        this.email = obj.email;
        this.celular = obj.celular;
        this.endereco = obj.endereco;
        this.cidade = obj.cidade;
        this.estado = obj.estado;
        this.bairro = obj.bairro;
        this.cep = obj.cep;
        this.senha = obj.senha;
    }

    camposParaCadastro() {
        return !!(this.razaoSocial && this.cnpj && this.email && this.celular && this.endereco && this.cidade && this.estado && this.bairro && this.cep && this.senha);
    }

    camposParaLogin() {
        return !!(this.email && this.senha);
    }
}