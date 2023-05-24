var express = require('express');
var server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use('/public', express.static('public'));

const bdd = require('./bdd');
let categories = [];
let vetement_welcome = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getFrontPageRandom(list) {
    var chosenIndexes = [];
    var res = [];
    var i = 0;
    while (res.length < 5) {
        i = getRandomInt(list.length);
        if (!chosenIndexes.includes(i)) {
            res.push(list[i]);
        }
    }
    return res;
}
async function run(){
    await bdd.connect();
    
    
    categories = await bdd.list_categories();

    all_vetements = await bdd.getAll();
    vetements = getFrontPageRandom(all_vetements);
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
    const res = await bdd.total();
    return res;
}

// set the view engine to ejs
server.set('view engine', 'ejs');

server.use((req, res, next) => {
    var time = new Date();
    console.log("requête reçue à "+time.toString());
    next();
});

server.get('/', (req, res) => {
    console.log("non");
});

// use res.render to load up an ejs view file
server.get('/swagger', async (req, res, next) => {
    const total = await totalP();
    const searchBar = await bdd.getAllDistinct();
    res.render('pages/accueil', {categories : categories, vetements : vetements, total : total, search : searchBar});
});

server.post('/swagger', async (req, res, next) => {
    const id_v = req.body.id_vet;
    ajoutP(id_v);
    await bdd.remStock(id_v);
    const total = await totalP();
    const searchBar = await bdd.getAllDistinct();
    res.render('pages/accueil', {categories : categories, vetements : vetements, total : total, search : searchBar});
});

server.get('/swagger/body/:vetement', async (req, res) =>{
    const vet = req.params.vetement;
    if(categories.includes(vet)){
        const items = await bdd.categorie(vet);
        const total = await totalP();
        const searchBar = await bdd.getAllDistinct();
        res.render('pages/vetement', {categories : categories, type_vet : vet, items : items, total : total, search : searchBar});
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
    const total = await totalP();
    const searchBar = await bdd.getAllDistinct();
    res.render('pages/vetement', {categories : categories, type_vet : vet, items : items, total : total, search : searchBar});
});


server.get('/swagger/panier', async (req, res) =>{
    const vet = await bdd.panier();
    const basketContent = await bdd.getPanier();

    const p = [];
    var tmp;
    for(var i=0; i<vet.length; i++){
        var tmp = await bdd.getV(vet[i]);
        p.push(tmp);
    }
    const total = await totalP();
    const searchBar = await bdd.getAllDistinct();
    res.render('pages/panier', {vetements : p, categories : categories, total : total, basketContent : basketContent, search : searchBar});
});

server.post('/swagger/panier', async (req, res) =>{
    if(req.body.remove == -1) {
        await bdd.clear();
    } else {
        await bdd.remP(req.body.remove);
    }
    const vet = await bdd.panier();
    const p = [];
    var tmp;
    for(var i=0; i<vet.length; i++){
        var tmp = await bdd.getV(vet[i]);
        p.push(tmp);
    }
    const total = await totalP();
    const basketContent = await bdd.getPanier();
    const searchBar = await bdd.getAllDistinct();
    res.render('pages/panier', {vetements : p, categories : categories, total : total, basketContent : basketContent, search : searchBar});
});

server.get('/swagger/admin', async (req,res) =>{
    res.render('pages/admin', {vetements : vetements});
});

server.post('/swagger/admin/ajouter', async (req,res)=>{
    // const nom = req.body.nom;
    // const chemin = req.body.chemin;
    // const prix = req.body.prix;
    // const type_vetement = req.body.type;
    // const taille = req.body.taille;
    var stock = req.body.stock;
    // await bdd.insert(nom,chemin,prix,type_vetement,taille,stock);
    const id = req.body.id;
    await bdd.updateV(id,stock);
    vetements = await bdd.getAll();
    res.render('pages/admin', {vetements : vetements});
});

server.post('/swagger/admin/retirer', async (req, res) =>{
    const id = req.body.id;
    await bdd.rem(id);
    vetements = await bdd.getAll();
    res.render('pages/admin', {vetements : vetements});
});

server.get('*', (req,res) =>{
    res.render('pages/erreur');
});

server.listen(8080);
console.log('http://localhost:8080/swagger');