'use strict';

let response = require('./res'); //response yang akan memanggil res
let connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)  
};

//materi GET 
//menampilkan semua data mahasiswwa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM  mahasiswa', function (error, rows, fields) {
       if (error) {
            console.log(error);
       } else {
            response.ok(rows, res)
       } 
    });
};

//menampilkan semua data mahasiswa berbasarkan id 
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        }
    )
}