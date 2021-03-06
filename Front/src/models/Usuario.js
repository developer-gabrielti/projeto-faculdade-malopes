export class UsuarioModel {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.email = obj.email;
        this.celular = obj.email;
        this.endereco = obj.endereco;
        this.cidade = obj.cidade;
        this.estado = obj.estado;
        this.bairro = obj.bairro;
        this.cep = obj.cep;
        this.senha = obj.senha;
    }

    camposParaLogin() {
        return !!(this.email && this.senha);
    }

    camposParaCadastro() {
        return !!(this.nome && this.cpf && this.email && this.cidade && this.estado && this.bairro && this.cep && this.senha);
    }

}