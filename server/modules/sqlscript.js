'use strict'

module.exports = executeQuery;      // dico che lafunzione presente nello script diventa un modulo e lo esporto nel resto dell'applicazione

const mysql = require('mysql');         // attivo il module mysql che ho installato
const connection = mysql.createConnection({   // creo la connessione al database
    host: 'sql11.freesqldatabase.com',
    user: 'sql11465158',
    password: 'D5DzrxsYvR'
});
function executeQuery(sql, params, callback){   // creo la funzione executeQuery
   /*  connection.connect(function(err) {  
        if (err) throw err;  
        console.log("Connected!");  
    }); */   // apertura della connessione
    connection.query(sql, params, callback);    // elaboro le query
   // connection.end();   // chiusura della connessione
}