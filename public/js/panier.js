const bdd = require('../../bdd');
let panier = [];

console.log("test");

function totalPanier(){
    let total = 0;
    for(let i=0; i<panier.length; i++){
        total += panier[i].prix;
    }
    return total;
}

function ajouterAuPanier(id) {
    // Trouver l'article correspondant à l'ID dans votre liste d'articles
    var article = bdd.getV(id);
  
    // Ajouter l'article au panier
    panier.push(article);
  
    // Mettre à jour l'affichage du panier
    //afficherPanier();
    console.log("Prix total: "+totalPanier());
}

function enleverDuPanier(id){

}

module.exports.panier = panier;
module.exports.totalPanier = totalPanier;
module.exports.ajouterAuPanier = ajouterAuPanier;
module.exports.enleverDuPanier = enleverDuPanier;
