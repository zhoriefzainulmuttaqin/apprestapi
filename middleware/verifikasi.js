const jwt = require('jsonwebtoken'); //memanggil jwt
const config = require('../config/secret'); //memanggil secret

function verifikasi () { //mengecek verifikasi role
    return function (req, rest, next) {
        let role = req.body.role; //role mengambil data dari body
        //cek authorization header
        let tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) { //ketika 
                    return rest.status(401).send({
                        auth:false, 
                        message: "Token tidak terdaftar!"
                    });
                } else {
                    if (role == 2) { //jika token sesuai dengan rolenya, maka akan next
                        req.auth = decoded;
                        next();
                    } else { //jika tidak maka akan muncul pesan token tidak valid
                        return rest.status(401).send({
                            auth:false, 
                            message: "Token tidak valid!"
                        });
                    }
                }
            });
        } else {
            return rest.status(401).send({
                auth:false, 
                message: "Token tidak tersedia!"
            });
        }
    }
}

module.exports = verifikasi;