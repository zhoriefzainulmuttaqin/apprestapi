'use strict'; //use strict untuk menjaga kode js untuk meminimalisir kesalahan code

exports.ok = function (values, res) { //ok akan dikirmkan ke controller
    let data = {
        'status' :200,
        'values' :values
    };

    res.json(data);
    res.end();
}