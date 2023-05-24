function bdd(){

    const pg = require('pg');
    // const pool = new pg.Pool({
    //     user: 'francois',
    //     host: 'localhost',
    //     database: 'bdd',
    //     password: '123456',
    //     port: 5432
    // });
    const pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'bdd',
        password: '1234',
        port: 5432
    });

    let client;

    this.connect = async function(){
        client = await pool.connect();
    };

    this.disconnect = async function(){
        if(client){
            await client.release();
            console.log("Disconnected from database.");
        }
    }

    this.getAll = async function(){
        try{
            const result = await client.query('SELECT * FROM vetements');
            return result.rows;
        } catch(error){
            console.error('Error vetements',error);
            return null;
        }
    }
    this.getAllDistinct = async function() {
        try {
            const result = await client.query("SELECT DISTINCT nom FROM vetements");
            return result.rows.map(row => row.nom);
        } catch (error) {
            console.error("Eroor distinct all", error);
            return null;
        }
    }

    this.prefixe = async function(prefixe){
        try {
            const result = await client.query('SELECT * FROM vetements WHERE nom LIKE $1', [prefixe + '%']);
            return result.rows;
          } catch (error) {
            console.error('Error while searching for words:', error);
            return [];
          }
    };

    this.list_categories = async function() {
        try {
            const result = await client.query('SELECT cat FROM categorie');
            return result.rows.map(row => row.cat);
            
        } catch (error) {
            console.log('Error while requesting list-categories:', error);
            return [];
        }
    }

    this.allLinks = async function() {
        try {
            const result = await client.query('SELECT DISTINCT chemin FROM vetements');
            return result.rows.map(row => row.chemin);
        } catch (error) {
            console.log('Error while requsting allLinks :', error);
            return [];
        }
    }

    this.categorie = async function(nom){
        try{
            const result = await client.query('SELECT * FROM vetements WHERE type_vetement=$1', [nom]);
            //return result.rows;
            return result.rows.map(row => row);

        } catch(error){
            console.error('Error while searching for categorie:', error);
            return [];
        }
    }

    this.addStock = async function(nom){
        try{
            const result = await client.query('UPDATE vetements SET stock = stock+1 WHERE nom=$1',[nom]);
            return true;
        } catch(error){
            console.error('Error while add stock:',error);
            return false;
        }
    }

    this.remStock = async function(id){
        try{
            const checkResult = await client.query('SELECT stock FROM vetements WHERE id = $1', [id]);
            const currentStock = checkResult.rows[0].stock;
            if (currentStock > 0) {
                const result = await client.query('UPDATE vetements SET stock = stock-1 WHERE id=$1',[id]);
                return true;
            } else {
                console.error('Stock is already empty for:', id);
                return false;
            }
        } catch(error){
            console.error('Error while remove stock:',error);
            return false;
        }
    }

    this.verifStock = async function(nom){
        try{
            const result = await client.query('SELECT stock FROM vetements WHERE nom = $1', [nom]);
            return result.rows[0].stock;
        } catch(error){
            console.error('Error while verifStock:', error);
            return -1;
        }
    }

    this.insert = async function(nom, path, prix, categorie, taille, stock) {
        try {
            const checkResult = await client.query('SELECT * FROM vetements WHERE nom = $1 AND taille = $2', [nom, taille]);
            if (checkResult.rows.length > 0) {
                console.error('Un vetement avec le même nom existe déjà.');
                return false;
            } else {
                const result = await client.query('INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES ($1, $2, $3, $4, $5, $6)', [nom, path, prix, categorie, taille, stock]);
                console.log('Nouveau vetement inséré avec succès :', nom);
                return true;
            }
        } catch (error) {
            console.error('Erreur lors de l\'insertion du vetement :', error);
            return false;
        }
    }

    this.rem = async function(id){
        try{
            await client.query('DELETE FROM vetements WHERE id = $1', [id]);
            console.log('removed');
        } catch(error){
            console.log('Error while remove', error);
        }
    }

    this.stock = async function(){
        try {
            const result = await client.query('SELECT COUNT (*) FROM vetements');
            return parseInt(result.rows[0].count);
        } catch (error) {
            console.error('Erreur lors de la requête de comptage :', error);
            throw error;
        }
    }

    this.clear = async function(){
        await client.query('TRUNCATE TABLE panier');
    }

    this.addP = async function(id){
        try{
            const result = await client.query('INSERT INTO panier (id_vetement) VALUES ($1)',[id]);
            console.log('item added');
            return true;
        } catch(error){
            console.error('Error while add item:',error);
            return false;
        }
    }

    this.remP = async function(id){
        try{
            const result = await client.query('DELETE FROM panier WHERE id = $1',[id]);
            return true;
        } catch(error){
            console.error('Error while remove item:',error);
            return false;
        }
    }

    this.total = async function(){
        try {
            const result = await client.query('SELECT SUM(prix) AS total FROM vetements INNER JOIN panier ON vetements.id = panier.id_vetement');
            return result.rows[0].total;
          } catch (error) {
            console.error('Error while getting total:', error);
            return 0;
          }
    }

    this.panier = async function(){
        try{
            const result = await client.query('SELECT id_vetement FROM panier');
            return result.rows.map(row => row.id_vetement);
        } catch(error){
            console.error('Error while panier');
            return null;
        }
    }

    this.getPanier = async function(){
        try{
            const result = await client.query('SELECT id FROM panier');
            return result.rows.map(row => row.id);
        } catch(error){
            console.error('Error while panier acces');
            return null;
        }
    }

    this.getV = async function(id){
        try{
            const result = await client.query('SELECT * FROM vetements WHERE id = $1',[id]);
            return result.rows[0];
        }catch(error){
            console.error('Error while returning vetement:', error);
            return null;
        }
    }

    this.updateV = async function(id,stock){
        try{
            const result = await client.query('UPDATE vetements SET stock = $2 WHERE id=$1',[id,stock]);
        } catch(error){
            console.error('Error while update vetements:',error);
        }
    }

    this.getAllCombi = async function(){
        try{
            const result = await client.query('SELECT * FROM combinaison');
            return result.rows;
        } catch(error){
            console.error('Error combinaison',error);
            return null;
        }
    }
    
}

module.exports = new bdd();