module.exports = class UsuarioDTO {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.nome = obj.nome;
        this.email = obj.email;
        this.senha = obj.senha;

    }

    camposParaCadastro() {
        return !!(this.nome && this.email && this.senha);
    }

    camposParaLogin() {
        return !!(this.email && this.senha);
    }
}