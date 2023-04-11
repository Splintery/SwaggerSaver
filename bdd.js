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

    this.categorie = async function(nom){
        try{
            const result = await client.query('SELECT cat FROM categorie WHERE cat=$1', [nom]);
            return result.rows.map(row => row.cat);

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
            console.error(('Error while add stock:',error));
            return false;
        }
    }
}

module.exports = new bdd();