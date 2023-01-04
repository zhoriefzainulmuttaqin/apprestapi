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

    connection.query (query, function (error, rows) {
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

// LOGIN
// Controller untuk login
exports.login = function (req, res) {
    let post = {
        password: req.body.password,
        email: req.body.email //bisa email ataupun username, tapi agar lebih spesifik lebih baik login menggunakan email agar meminimalisir kesalahan login username yg sama
    }

    let query = "SELECT *  FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "password", md5(post.password), "email", post.email]; //mencari email dan password dari user ketika user memasukkan email dan password

    query = mysql.format(query, table); //akan menjalankan query email dan password
    connection.query(query, function (error, rows) {
        if (error) { //jika error maka akan menampilkan error
            console.log(error);
        } else { //jika benar maka:
            if (rows.length == 1) { //akan mengecek apakah data tersebut ada?
                let token = jwt.sign({rows}, config.secret, { //jika ada maka akan megenerate token 
                    expiresIn: 1440 //dalam waktu 1440 detik atau hangus dalam 20 menit
                });
                id_user = rows[0].id; //mengambil data dari tabel user (id) yang akan dikirimkan ke tabel akses_token (id_user)
           
                let data = { //menampung data yang akan dikirimkan ke akses_token
                    id_user: id_user,
                    acces_token: token,
                    ip_address: ip.address()
                }
            
                let query = "INSERT INTO ?? SET ?"; //query untuk menampung data
                let table = ["akses_token"]; //memasukkan data ke tabel akses_token

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            succes: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else { //jika email/password user tidak ada di dalam database, maka akan menampilkan pesan error
                res.json({
                    "Error": true,
                    message: 'Email atau Password salah!'
                });
            }
        }
    });
}

exports.secretpage = function (req, res) {
    response.ok("Halaman ini hanya untuk Administrator (role:2)", res); //isi halaman admin/role 2
}
