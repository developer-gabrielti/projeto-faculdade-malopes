const variaveis = {

    login: "/Front/src/views/newLogin.html",
    cadastro: "/Front/src/views/newCadastro.html",
    profissional: "/Front/src/views/newProfissional.html",
    cliente: "/Front/src/views/newCliente.html"
}

function irPara(route) {
    if (variaveis[route]) window.location.replace(variaveis[route]);
    else alert('Rota inválida');
}

export {
    irPara
}