export class BaseAPI {
    constructor(obj) {
        this.method = obj.method || null;
        this.url = obj.url || null;
        this.data = obj.data || null;
        this.headers = {
            ...obj.headers || null,
            'Content-Type': 'application/json',
        };
        this.params = obj.params || null;
    }

    request() {
        return new Promise((resolve, reject) => {
            axios({
                    method: this.method,
                    url: this.url,
                    data: this.data,
                    params: this.params,
                    headers: this.headers,
                    withCredentials: false
                })
                .then((response) => {
                    this.treatResponse(response);
                    resolve(response)
                })
                .catch((err) => reject(err));
        });
    }

    treatResponse(response, mostrarAlertaSucesso = true, mostrarAlerta404 = true) {

        let falha = response.data.status === 200 ? false : true;

        if (!falha && mostrarAlertaSucesso) {
            alert('Sucesso ! \n', response.data.mensagem);
        } else {
            let show = false;
            if (response.data.status === 404 && mostrarAlerta404) show = true;
            else if (response.data.status != 404) show = true;
            if (show) {
                alert(`${response ? response.data.mensagem : "Falha de conexão com o servidor"}`);
            }
        }
    }
};