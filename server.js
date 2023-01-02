const bodyParser = require('body-parser'); //untuk memanggil library body-parser
const express = require('express'); //untuk memanggil library expressjs
const app = express(); //untuk memanggil expressjs

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => { //server port 3000
    console.log(`Server started on port`);
});
