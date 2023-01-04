const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();
// const verifikasi = require('./verifikasi');

// daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi
router.get('/api/v1/secret', verifikasi(), auth.secretpage) //memverifikasi apakah login sebagai admin/role 2 dan apakah memiliki token?


module.exports = router; 
