var express = require('express');
var server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use('/public', express.static('public'));

const bdd = require('./bdd');
let categories = [];
let vetement_welcome = [];
async function run(){
    await bdd.connect();
    
    
    categories = await bdd.list_categories();
    vetement_welcome = await bdd.allLinks();

    await bdd.clear();
    // await bdd.clear();
    // await bdd.disconnect();
}

run();

async function ajoutP(id){
    await bdd.addP(id);
    console.log("ajouté avec succès");
}

async function enleveP(id){
    await bdd.remP(id);
    console.log("retiré avec succès");
}

async function resetP(){
    await bdd.clear();
    console.log("reset");
}

async function totalP(){
    const total = await bdd.total();
    console.log("total"+total+"$");
}

// set the view engine to ejs
server.set('view engine', 'ejs');

server.use((req, res, next) => {
    var time = new Date();
    console.log("requête reçue à "+time.toString());
    next();
});



// use res.render to load up an ejs view file
server.get('/swagger', (req, res, next) => {
    console.log("viewing page !");
    res.render('pages/accueil', {categories : categories, display_clothes : vetement_welcome});
});

server.get('/swagger/body/:vetement', async (req, res) =>{
    const vet = req.params.vetement;
    if(categories.includes(vet)){
        const items = await bdd.categorie(vet);
        res.render('pages/vetement', {categories : categories, type_vet : vet, items : items, bdd : bdd});
    }else{
        console.log("body de " + vet + " existe pas");
    }
});

server.post('/swagger/body/:vetement', async (req, res) => {
    const vet = req.params.vetement;
    const items = await bdd.categorie(vet);
    const vetementId = req.body.vetement_id;
    ajoutP(vetementId);
    await bdd.remStock(vetementId);
    res.render('pages/vetement', {categories : categories, type_vet : vet, items : items, bdd : bdd});
});


server.get('/swagger/panier', async (req, res) =>{
    const vet = await bdd.panier();
    const p = [];
    var tmp;
    for(var i=0; i<vet.length; i++){
        var tmp = await bdd.getV(vet[i]);
        p.push(tmp);
    }
    res.render('pages/panier', {vetements : p});
});



server.listen(8080);
console.log('http://localhost:8080/accueil');