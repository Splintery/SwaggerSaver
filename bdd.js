function bdd(){

    const pg = require('pg');
    // const pool = new pg.Pool({
    //     user: 'francois',
    //     host: 'localhost',
    //     database: 'bdd',
    //     password: '12345',
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
}

module.exports = new bdd();