import * as API from '/Front/src/api/empresa/servico.js';

document.addEventListener('DOMContentLoaded', e => {
    renderizarCards();
}, false)


function cardTemplate(imagem, razao, servico, desc){
    return `
    
    <div class="col">
        <div class="card shadow-sm">
            <img src="${imagem}"
                alt="">

            <div class="card-body">
                    <h4>${razao}</h4>
                    <h5>${servico}</h5>
                    <p class="card-text">
                        ${desc}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Abrir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
    `
}

async function renderizarCards() {
    try {
        const respose = await API.listar();

        let div = document.getElementById('cards-servico');

        console.log(respose.data)
        // for (let i = 0; i < respose.data.length; i++) {

        //     console.log(respose.data[i])
        //     console.log(respose.data[i].razaoSocial)
        //     console.log(respose.data[i].servicos[i])

        //     // div.innerHTML = respose.data.map((x)=>{
        //     //     return cardTemplate(x[i].servicos.linkImg, x[i].razaoSocial, x[i].servicos.nome, x[i].servicos.descricao)
        //     // }).join('') 
        // }

        // for (var servicos in respose.data) {
        //     // ctrl+shift+k (para abrir o console no mozilla firefox)
        //     console.log("obj." + servicos + " = " + respose.data[servicos].descricao);
        // }


        div.innerHTML = respose.data.map((x)=>{
            return cardTemplate(x.servicos.linkImg, x.razaoSocial, x.servicos.nome, x.servicos.descricao)
        }).join('') 

    } catch (error) {
        console.log(error)
    }
}