// BaseAPI
import { BaseAPI } from '../base.js';

function cadastrar(model) {
    return new Promise(async(resolve, reject) => {
        const api = new BaseAPI({
            method: 'POST',
            url: `http://localhost:3333/empresa/${model.id}/cadastrarServicos`,
            data: model,
        });

        await api.request()
            .then(response => {
                resolve(response)
            })
            .catch(err => reject(err));
    });
}

function listar() {
    return new Promise(async(resolve, reject) => {
        const api = new BaseAPI({
            method: 'GET',
            url: 'http://localhost:3333/servico/listarServicos', 
        });

        await api.request(false)
            .then(response => {
                resolve(response)
            })
            .catch(err => reject(err));
    });
}


export {
    cadastrar,
    listar
}