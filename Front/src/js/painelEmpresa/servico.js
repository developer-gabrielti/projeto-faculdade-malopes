import { ServicoModel } from '/Front/src/models/painelEmpresa/Servico.js';

import * as API from '/Front/src/api/empresa/servico.js';

const elements = {
    inputServicoPrestado: document.getElementById('inputServicoPrestado'),
    inputServicoImg: document.getElementById('inputServicoImg'),
    inputServicoDescricao: document.getElementById('inputServicoDescricao'),
    btnCadastrarServico: document.getElementById('btnCadastrarServico'),
}

document.addEventListener('DOMContentLoaded', e => {
    elements.btnCadastrarServico.addEventListener('click', cadastrarServico, false)
}, false);


async function cadastrarServico() {
    try {
        const servicoModel = new ServicoModel({
          id: localStorage.getItem('empresa'),
          nomeDoServico: elements.inputServicoPrestado.value,
          descricaoServico: elements.inputServicoDescricao.value,
          linkImg: elements.inputServicoImg.value,
        })

        if (servicoModel.camposParaCadastro()) {
            const respose = await API.cadastrar(servicoModel)

            // if (respose.data.status = 200) {
            //     alert('deu certo');
            // }
        }        
    } catch (error) {
        console.log(error)
    }
}