'use strict';

module.exports = function (app) {
    let jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index); //jsonku = controller 
                            //pada controller akan menghubungkan ke index yang akan meresponse "APlikasi REST API ku bverjalan!"

    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);

    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);

    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);
}
