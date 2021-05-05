module.exports = {
    build(statusCode, statusMessage = '', body = []) {
        return {
            status: statusCode || 500,
            mensagem: statusMessage || '',
            body: body.constructor !== Array ? [body] : body
        };
    },
    getDefault(statusCode) {
        let response;

        switch (statusCode) {
            case 400:
                response = {
                    status: statusCode,
                    mensagem: 'Preencha todos os campos corretamente', //'Dados inválidos',
                    body: []
                };
                break;

            case 401:
                response = {
                    status: statusCode,
                    mensagem: 'Não autorizado',
                    body: []
                };
                break;

            case 403:
                response = {
                    status: statusCode,
                    mensagem: 'Acesso negado',
                    body: []
                };
                break;

            case 404:
                response = {
                    status: statusCode,
                    mensagem: 'Não encontrado',
                    body: []
                };
                break;

            case 500:
            default:
                response = {
                    status: statusCode,
                    mensagem: 'Erro interno do servidor',
                    body: []
                };
                break;
        }

        return response;
    }
}