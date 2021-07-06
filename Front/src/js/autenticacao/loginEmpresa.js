
//Models
import { EmpresaModel } from '/Front/src/models/Empresa.js';

//APIs
import * as API from '/Front/src/api/autenticacao/empresa.js';

//Routes
import * as Routes from '/Front/src/routes/routes.js';

const elements = {
    inputEmailEmpresa: document.getElementById('inputEmailEmpresa'),
    inputSenhaEmpresa: document.getElementById('inputSenhaEmpresa'),
    btnLogin: document.getElementById('botaoEntrarEmpresa'),
    btnCadastro: document.getElementById('botaoCadastroEmpresa'),
    radioCliente: document.getElementById('radioLoginCliente'),
    radioProfissional: document.getElementById('radioLoginProfissional'),
}

document.addEventListener('DOMContentLoaded', e => {
    elements.btnLogin.addEventListener('click', login, false)    
}, false);

async function login() {
    try {
        if (elements.radioProfissional.checked == true) {
            const empresaModel = new EmpresaModel({
                email: elements.inputEmailEmpresa.value,
                senha: elements.inputSenhaEmpresa.value,
            })

            if (empresaModel.camposParaLogin()) {
                const response = await API.login(empresaModel)

                localStorage.setItem("empresa", JSON.stringify(response.data.body[0].empresaID))
                localStorage.setItem("tokenEmpresa", JSON.stringify(response.data.body[0].token))
                if (response.data.status == 200) {
                    irParaPagina();
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function irParaPagina() {
    Routes.irPara('profissional');
}

function irParaCadastro() {
    Routes.irPara('cadastro');
}