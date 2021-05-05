const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

function generateJWT(req) {
    return new Promise(async resolve => {
        try {
            const crypto = require('crypto');

            let header = {
                "typ": "JWT",
                "alg": "HS256"
            }

            header = JSON.stringify(header);
            header = Buffer.from(header).toString('base64');

            let payload = [{
                iss: 'gabriel.com', // source
                iat: new Date().getTime(), // generated timestamp
                exp: new Date(new Date().getTime() + 36000000).getTime(), // expiration 1 hour
                sub: 'usuários', // targets
                email: req.email || null, // fields
                nome: req.nome || null, // fields
            }];

            payload = JSON.stringify(payload);
            payload = Buffer.from(payload).toString('base64');

            let key = 'gabriel';
            let signature = crypto.createHmac('sha256', key).update(header + "." + payload).digest('base64');
            signature = Buffer.from(signature).toString('base64');
            let token = header + "." + payload + "." + signature;
            resolve(token);
        } catch (err) {
            console.log(err);
            resolve(null);
        }
    });
}

function validateJWT(req) {
    return new Promise(async resolve => {
        try {
            if (req.token) {
                const jwtDecode = require('jwt-decode');
                var decoded = jwtDecode(req.token);

                if (decoded) {
                    // checking validity
                    var infos = decoded[0];

                    if (infos.exp < new Date().getTime()) {
                        resolve({
                            valid: false,
                            status: 401, // expired
                            message: 'Token expirado',
                            details: 'Expired token',
                            decoded: null,
                            token: req.token,
                        });
                    } else {
                        resolve({
                            valid: true,
                            status: 200,
                            message: 'Acesso liberado',
                            details: 'Access granted',
                            decoded: infos,
                            token: req.token,
                        });
                    }
                } else {
                    resolve({
                        valid: false,
                        status: 500,
                        message: 'Erro ao verificar token',
                        details: 'Error while checking token',
                        decoded: null,
                        token: req.token,
                    });
                }
            } else resolve({
                valid: false,
                status: 400,
                message: 'Token inválido',
                details: 'Invalid token',
                decoded: null,
                token: req.token,
            });
        } catch (err) {
            console.log(err);
            resolve({
                valid: false,
                status: 500,
                message: 'Erro ao verificar token',
                details: 'Error while checking token',
                decoded: null,
                token: req.token,
            });
        }
    });
}

module.exports = {
    generateJWT,
    validateJWT
}