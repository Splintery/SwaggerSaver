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
}

run();

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


server.listen(8080);
console.log('http://localhost:8080/swagger');


// un fichier qui pourrait remplacer les index1 , index2 ect mais a voir si on a le temps
/*
server.get('/swagger/:page/:info', async (req, res, next) => {
    res.render('pages/index', {categories : categories, page : 0});
    const p = req.params.page;
    const i = req.params.info;
    if(p !== undefined){

        if(i !== undefined){

            // aller dans la page des vetements
            if(p === 'body' ){
                if(categories.includes(i)){
                    const items = await bdd.categorie(i);
                    res.render('pages/index', {categories : categories, type_vet : i, items : items, page : 1});
                }else{
                    console.log("body de " + vet + " existe pas");
                }
            }

        }

    }
});
*/