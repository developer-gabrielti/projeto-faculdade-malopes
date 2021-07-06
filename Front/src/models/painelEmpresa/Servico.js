export class ServicoModel {
    constructor(obj) {
        obj = obj || {};

        // Campos database
        this.id = obj.id;
        this.nomeDoServico = obj.nomeDoServico;
        this.descricaoServico = obj.descricaoServico;
        this.linkImg = obj.linkImg;
        
    }
    camposParaCadastro() {
        return !!(this.id && this.nomeDoServico && this.descricaoServico && this.linkImg);
    }

}