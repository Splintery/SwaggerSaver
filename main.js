var express = require('express');
var server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use('/public', express.static('public'));

const bdd = require('./bdd');
async function run(){
    await bdd.connect();

    await bdd.disconnect();
}

run();

let categories = [
    "Chemise",
    "Veste",
    "Tshirt",
    "Sweat",
    "Jeans",
    "Joggings",
    "Accessoires"
];

// set the view engine to ejs
server.set('view engine', 'ejs');

server.use((req, res, next) => {
    var time = new Date();
    console.log("requête reçue à "+time.toString());
    next();
});



// use res.render to load up an ejs view file
server.get('/test', (req, res, next) => {
    console.log("viewing page !");
    res.render('pages/index', {categories : categories});
});


server.listen(8080);
console.log('http://localhost:8080/test');