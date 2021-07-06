// Models
import { EmpresaModel } from "../../models/Empresa.js";

//APIs
import * as API from "../../api/autenticacao/empresa.js";

// Routes
import * as Routes from "../../routes/routes.js";

const elements = {
    //Dados empresa
    inputNomeEmpresa: document.getElementById('inputNomeEmpresa'),
    inputCNPJ: document.getElementById('inputCNPJ'),
    inputEmailEmpresa: document.getElementById('inputEmailEmpresa'),
    inputNumCelularEmpresa: document.getElementById('inputNumCelularEmpresa'),
    inputCidadeEmpresa: document.getElementById('inputCidadeEmpresa'),
    inputEstadoEmpresa: document.getElementById('inputEstadoEmpresa'),
    inputBairroEmpresa: document.getElementById('inputBairroEmpresa'),
    inputCEPempresa: document.getElementById('inputCEPempresa'),
    inputEnderecoEmpresa: document.getElementById('inputEnderecoEmpresa'),
    inputSenhaEmpresa: document.getElementById('inputSenhaEmpresa'),
    inputConfSenhaEmpresa: document.getElementById('inputConfSenhaEmpresa'),
    btnCadastrarEmpresa: document.getElementById('btnCadastrarEmpresa'),
    btnVoltarEmpresa: document.getElementById('btnVoltarEmpresa')
}

document.addEventListener('DOMContentLoaded', async e => {
    elements.inputNumCelularEmpresa.addEventListener('blur', mascaraCelular, false);
    elements.inputCNPJ.addEventListener('blur', validarCNPJ, false);
    elements.inputCEPempresa.addEventListener('blur', buscarCep, false);
    elements.btnCadastrarEmpresa.addEventListener('click', cadastrarEmpresa, false);
    elements.btnVoltarEmpresa.addEventListener('click', voltar, false);
})

async function cadastrarEmpresa() {
    try {
        const empresaModel = new EmpresaModel({
            razaoSocial: elements.inputNomeEmpresa.value,
            cnpj: elements.inputCNPJ.value,
            email: elements.inputEmailEmpresa.value,
            celular: elements.inputNumCelularEmpresa.value,
            endereco: elements.inputEnderecoEmpresa.value,
            cidade: elements.inputCidadeEmpresa.value,
            estado: elements.inputEstadoEmpresa.value,
            bairro: elements.inputBairroEmpresa.value,
            cep: elements.inputCEPempresa.value,
            senha: elements.inputSenhaEmpresa.value
        });

        if (empresaModel.camposParaCadastro()) {
            const response = await API.cadastrar(empresaModel)
            console.log(response);

            if (response.data.status == 200) {
                alert('Cadastrado com sucesso!');
            }
        } else {
            alert('Falha ao cadastrar!');
        }
    } catch (error) {
        console.log(error);
    }
}

function mascaraCelular() {

    let r = elements.inputNumCelularEmpresa.value.replace(/\D/g, "");
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
    elements.inputNumCelularEmpresa.value = (r)
}

function validarCNPJ() {

    let cnpj = elements.inputCNPJ.value.replace(/[^\d]+/g, '');

    if (cnpj == '') return alert('CNPJ INVALIDO');

    if (cnpj.length != 14)
        return alert('CNPJ INVALIDO');

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return alert('CNPJ INVALIDO');

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return alert('CNPJ INVALIDO');

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return alert('CNPJ INVALIDO');

    return alert('CNPJ VALIDADO');

}

async function buscarCep() {
    var cep = elements.inputCEPempresa.value.replace(/\.|\-/g, "");

    console.warn("CEP DIGITADO FOI: " + cep)

    // Verificando cep
    if (cep != "") {

        // Expressão regular para validar o CEP
        var validarCEP = /^[0-9]{8}$/;

        // Valida o formato do CEP
        if (validarCEP.test(cep)) {
            // Preencher os campos com "..." enquanto consulta webservices
            elements.inputCidadeEmpresa.value = "Buscando...";
            elements.inputEstadoEmpresa.value = "Buscando...";
            elements.inputBairroEmpresa.value = "Buscando...";
            elements.inputCEPempresa.value = "Buscando...";
            elements.inputEnderecoEmpresa.value = "Buscando...";

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
    elements.inputEnderecoEmpresa.value = ("");
    elements.inputCidadeEmpresa.value = ("");
    elements.inputEstadoEmpresa.value = ("");
    elements.inputBairroEmpresa.value = ("");
    elements.inputCEPempresa.value = ("");
}

function inserirDados(dados) {

    let cepValidado = dados.cep
    cepValidado = cepValidado.replace(/\.|\-/g, '')

    elements.inputEnderecoEmpresa.value = (dados.logradouro);
    elements.inputCidadeEmpresa.value = (dados.localidade);
    elements.inputEstadoEmpresa.value = (dados.uf);
    elements.inputBairroEmpresa.value = (dados.bairro);
    elements.inputCEPempresa.value = (cepValidado);
}

function voltar() {
    Routes.irPara('login')
}