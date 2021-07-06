'use strict';

// Models
import { UsuarioModel } from '/Front/src/models/Usuario.js';

// APIs
import * as API from '/Front/src/api/autenticacao/usuario.js';

//Routes
import * as Routes from "/Front/src/routes/routes.js";


// Variables
const elements = {
    campoEmail: document.getElementById('inputEmail'),
    campoSenha: document.getElementById('inputSenha'),
    radioCliente: document.getElementById('radioLoginCliente'),
    radioProfissional: document.getElementById('radioLoginProfissional'),
    btnEntrar: document.getElementById('botao-entrar'),
    btnCadastro: document.getElementById('botao-cadastro')
}

document.addEventListener('DOMContentLoaded', e => {
    escolhaCadastro();
    elements.btnEntrar.addEventListener('click', login, false);
    elements.btnCadastro.addEventListener('click', irParaCadastro, false);
    elements.radioProfissional.addEventListener('click', escolhaCadastro, false);
    elements.radioCliente.addEventListener('click', escolhaCadastro, false);
}, false);

async function escolhaCadastro() {
    if (elements.radioCliente.checked == true) {
        document.getElementById('form-Cliente').classList.remove('hide');
        document.getElementById('form-Empresa').classList.add('hide');
    } else if (elements.radioProfissional.checked == true) {
        document.getElementById('form-Empresa').classList.remove('hide');
        document.getElementById('form-Cliente').classList.add('hide');
    }
}

async function login() {
    try {
        if (elements.radioCliente.checked == true) {
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
            } else alert('Preencha todos os campos corretamente');
        } else {
            alert('Erro ao logar!');
        }
    } catch (error) {
        console.log(error);
    }
}

function irParaPagina() {
    Routes.irPara('cliente');
}

function irParaCadastro() {
    Routes.irPara('cadastro');
}