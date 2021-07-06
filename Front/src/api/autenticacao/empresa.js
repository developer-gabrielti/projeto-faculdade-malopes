// BaseAPI
import { BaseAPI } from '../base.js';

function cadastrar(model) {
    return new Promise(async(resolve, reject) => {
        const api = new BaseAPI({
            method: 'POST',
            url: 'http://localhost:3333/cadastrarEmpresas',
            data: model,
        });

        await api.request()
            .then(response => {
                resolve(response)
            })
            .catch(err => reject(err));
    });
}

function login(model) {
    return new Promise(async(resolve, reject) => {
        const api = new BaseAPI({
            method: 'POST',
            url: 'http://localhost:3333/loginEmpresa',
            data: model,
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
    login
}