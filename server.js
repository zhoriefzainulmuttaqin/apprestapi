const express = require('express'); //untuk memanggil library expressjs
const bodyParser = require('body-parser'); //untuk memanggil library body-parser

const morgan = require('morgan');
const app = express(); //untuk memanggil expressjs

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//memanggil routes
let routes = require('./routes');
routes(app);

// daftarkan menu routes dari index
app.use('/auth', require('./middleware'))

app.listen(3000, () => { //server port 3000
    console.log('Server started on port 3000');
});
