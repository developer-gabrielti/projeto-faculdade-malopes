//Models 
import { UsuarioModel } from "../../models/Usuario.js";

// APIs
import * as API from "../../api/autenticacao/usuario.js";

// Routes
import * as Routes from "../../routes/routes.js";

const elements = {
    
    // Dados cliente
    inputNomeCliente: document.getElementById('inputNomeCliente'),
    inputCPF: document.getElementById('inputCPF'),
    inputEmailCliente: document.getElementById('inputEmailCliente'),
    inputCelularCliente: document.getElementById('inputCelularCliente'),
    inputCidadeCliente: document.getElementById('inputCidadeCliente'),
    inputEstadoCliente: document.getElementById('inputEstadoCliente'),
    inputBairroCliente: document.getElementById('inputBairroCliente'),
    inputCEPCliente: document.getElementById('inputCEPCliente'),
    inputEnderecoCliente: document.getElementById('inputEnderecoCliente'),
    inputSenhaCliente: document.getElementById('inputSenhaCliente'),
    inputConfSenhaCliente: document.getElementById('inputConfSenhaCliente'),
    btnCadastroCliente: document.getElementById('btnCadastroCliente'),
    btnVoltar: document.getElementById('btnVoltar'),

    //radio
    radioCliente: document.getElementById('radioCliente'),
    radioProfissional: document.getElementById('radioEmpresa'),
}

document.addEventListener('DOMContentLoaded', async e => {
    escolhaCadastro()
    elements.radioCliente.addEventListener('click', escolhaCadastro, false);
    elements.radioProfissional.addEventListener('click', escolhaCadastro, false);
    elements.inputCEPCliente.addEventListener('blur', buscarCep, false);
    elements.inputCelularCliente.addEventListener('blur', mascaraCelular, false);
    elements.btnCadastroCliente.addEventListener('click', cadastrarCliente, false);
    elements.btnVoltar.addEventListener('click', voltarLogin, false);

}, false);

async function escolhaCadastro() {
    if (elements.radioCliente.checked == true) {
        document.getElementById('formCliente').classList.remove('hide')
        document.getElementById('formEmpresa').classList.add('hide')
    } else if (elements.radioProfissional.checked == true) {
        document.getElementById('formEmpresa').classList.remove('hide')
        document.getElementById('formCliente').classList.add('hide')
    }
}

async function cadastrarCliente() {
    try {
        const result = TestaCPF(elements.inputCPF.value)

        if (result == false) {
            alert('CPF invalido.');
            elements.inputCPF.value = '';
        } else {
            if (elements.inputConfSenhaCliente.value != elements.inputSenhaCliente.value) {
                alert('As senhas não são iguais');
            } else {
                const usuarioModel = new UsuarioModel({
                    nome: elements.inputNomeCliente.value,
                    cpf: elements.inputCPF.value,
                    email: elements.inputEmailCliente.value,
                    celular: elements.inputCelularCliente.value,
                    endereco: elements.inputEnderecoCliente.value,
                    cidade: elements.inputCidadeCliente.value,
                    estado: elements.inputEstadoCliente.value,
                    bairro: elements.inputBairroCliente.value,
                    cep: elements.inputCEPCliente.value,
                    senha: elements.inputSenhaCliente.value,
                });

                if (usuarioModel.camposParaCadastro()) {
                    const response = await API.cadastrar(usuarioModel);
                    console.log(response)

                    if (response.data.status == 200) {
                        console.log('cadastrado com sucesso');
                    }
                }

                else alert('Falha ao cadastrar');
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function mascaraCelular() {

    let r = elements.inputCelularCliente.value.replace(/\D/g, "");
    r = r.replace(/^0/, "");
  
    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    elements.inputCelularCliente.value = (r)
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

async function buscarCep() {
    var cep = elements.inputCEPCliente.value.replace(/\.|\-/g, "");

    console.warn("CEP DIGITADO FOI: " + cep)

    // Verificando cep
    if (cep != "") {

        // Expressão regular para validar o CEP
        var validarCEP = /^[0-9]{8}$/;

        // Valida o formato do CEP
        if (validarCEP.test(cep)) {
            // Preencher os campos com "..." enquanto consulta webservices
            elements.inputCidadeCliente.value = "Buscando...";
            elements.inputEstadoCliente.value = "Buscando...";
            elements.inputBairroCliente.value = "Buscando...";
            elements.inputCEPCliente.value = "Buscando...";
            elements.inputEnderecoCliente.value = "Buscando...";

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => {
                    const persons = res.data;

                    inserirDados(persons)
                }).catch(error => {
                    console.log(error);
                })
        }
        else {
            // CEP é invalido
            limparFormularioCep();
            alert("CEP INVALIDO")
        }
    }
    else {
        // CEP sem valor, limpa formulário
        limparFormularioCep()
    }
}

function limparFormularioCep() {
    //Limpa valores do formulário de cep.
    elements.inputEnderecoCliente.value = ("");
    elements.inputCidadeCliente.value = ("");
    elements.inputEstadoCliente.value = ("");
    elements.inputEstadoCliente.value = ("");
    elements.inputCEPCliente.value = ("");
}

function inserirDados(dados) {

    let cepValidado = dados.cep
    cepValidado = cepValidado.replace(/\.|\-/g, '')

    elements.inputEnderecoCliente.value = (dados.logradouro);
    elements.inputCidadeCliente.value = (dados.localidade);
    elements.inputEstadoCliente.value = (dados.uf);
    elements.inputBairroCliente.value = (dados.bairro);
    elements.inputCEPCliente.value = (cepValidado);
}

function voltarLogin() {
    Routes.irPara('login');
}