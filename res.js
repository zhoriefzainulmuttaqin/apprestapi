'use strict'; //use strict untuk menjaga kode js untuk meminimalisir kesalahan code

exports.ok = function (values, res) { //ok akan dikirmkan ke controller
    let data = {
        'status':200,
        'values':values
    };

    res.json(data);
    res.end();
};

//response untuk nested matakuliah
exports.oknested = function (values, res) {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        // tentukan key group
        if (akumulasikan[item.nama]) {
            // buat variabelgroup nama mahasiswa
            const group = akumulasikan[item.nama];
            // cek jika isi array adalah matakuliah
            if (Array.isArray(group.matakuliah)) {
                // tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    let data = {
        'status':200,
        'values':hasil
    }; 

    res.json(data);
    res.end();
}