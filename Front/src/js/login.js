'use strict';

// Models
import { UsuarioModel } from '/Front/src/models/Usuario.js';

// APIs
import * as API from '/Front/src/api/autenticacao/usuario.js';

//Routes
import * as Routes from "/Front/src/routes/routes.js";


// Variables
const elements = {
    campoEmail: document.getElementById('campoEmail'),
    campoSenha: document.getElementById('campoSenha'),
    btnEntrar: document.getElementById('botao-entrar')
}

document.addEventListener('DOMContentLoaded', e => {
    elements.btnEntrar.addEventListener('click', login, false);
}, false);

async function login() {
    try {
        const usuarioModel = new UsuarioModel({
            email: elements.campoEmail.value,
            senha: elements.campoSenha.value
        })

        if (usuarioModel.camposParaLogin()) {
            const response = await API.login(usuarioModel);
            let token = response.data.body[0].token;

            if (response.data.status == 200) {
                irParaPagina();
            }

            // alert('Login efetuado com sucesso ! Seu token de autenticação é: ', response.data.body[0].token);
        } else alert('Preencha todos os campos corretamente');
    } catch (error) {
        console.log(error);
    }
}

function irParaPagina() {
    Routes.irPara('profissional')
}