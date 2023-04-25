function bdd(){

    const pg = require('pg');
    const pool = new pg.Pool({
        user: 'francois',
        host: 'localhost',
        database: 'bdd',
        password: '123456',
        port: 5432
    });
    // const pool = new pg.Pool({
    //     user: 'postgres',
    //     host: 'localhost',
    //     database: 'bdd',
    //     password: '1234',
    //     port: 5432
    // });

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

    this.remStock = async function(nom){
        try{
            const checkResult = await client.query('SELECT stock FROM vetements WHERE nom = $1', [nom]);
            const currentStock = checkResult.rows[0].stock;
            if (currentStock > 0) {
                const result = await client.query('UPDATE vetements SET stock = stock-1 WHERE nom=$1',[nom]);
                return true;
            } else {
                console.error('Stock is already empty for:', nom);
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
            const checkResult = await client.query('SELECT * FROM vetements WHERE nom = $1', [nom]);
            if (checkResult.rows.length > 0) {
                console.error('Un vetement avec le même nom existe déjà.');
                return false;
            } else {
                const result = await client.query('INSERT INTO vetements (nom, path, prix, type_vetement, taille, stock) VALUES ($1, $2, $3, $4, $5, $6)', [nom, path, prix, categorie, taille, stock]);
                console.log('Nouveau vetement inséré avec succès :', nom);
                return true;
            }
        } catch (error) {
            console.error('Erreur lors de l\'insertion du vetement :', error);
            return false;
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
    
}

module.exports = new bdd();