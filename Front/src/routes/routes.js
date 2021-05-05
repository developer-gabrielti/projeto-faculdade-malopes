const variaveis = {

    profissional: "/Front/src/views/profissional.html"

}

function irPara(route) {
    if (variaveis[route]) window.location.replace(variaveis[route]);
    else alert('Rota inválida');
}

export {
    irPara
}