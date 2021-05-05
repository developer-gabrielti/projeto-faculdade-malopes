export class UsuarioModel {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.nome = obj.nome;
        this.email = obj.email;
        this.senha = obj.senha;
    }

    camposParaLogin() {
        return !!(this.email && this.senha);
    }

    camposParaCadastro() {
        return !!(this.nome && this.email && this.senha);
    }

}