const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller untuk register
exports.registrasi = function (req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM ?? WHERE ??=?"; //mengecek apakah email sudah terdaftar?
    let table = ["user", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) { //jika rows ada, maka tambahkan data
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            } else { //jika sudah terdaftar maka akan muncul pesan email sudah terdaftar
                response.ok("Email sudah terdaftar!", res);
            }
        }
    });
}