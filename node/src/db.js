const mysql = require('mysql');
const faker = require('faker-br');
let connection;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

function abrirConexao(){
    connection = mysql.createConnection(config);
}

function fecharConexao(){
    connection.end();
}

function verificarTabela(){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM people`;
        connection.query(sql, (error) => {
            if(error){
                if(error.code === 'ER_NO_SUCH_TABLE'){
                    const sqlCriacao = `CREATE TABLE people(id int not null auto_increment, name VARCHAR(255), primary key(id))`;
                    return connection.query(sqlCriacao, (errorCriacao) => {
                        if(errorCriacao) {
                            console.log("erro na criação da tabela");
                            console.log(errorCriacao);
                            return reject(errorCriacao);
                        }
                        console.log("criada a tabela");
                        return resolve();
                    });
                }
                else {
                    console.log("erro desconhecido na leitura da tabela");
                    return reject(error);
                }
            }else{
                console.log("tabela existe");
                return resolve();
            }
          });
    });
}

function inserirRegistro(){
    return new Promise((resolve, reject) => {
        const nome = faker.name.firstName();
        const sql = `INSERT INTO people(name) values("${nome}")`;
        connection.query(sql, (error) => {
            if(error){
                return reject(error);
            }
            return resolve();
        });
    })
}

function lerRegistros(){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM people`;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                return reject(error);
            }
            resolve(results);
          });
    });
}

module.exports = {
    abrirConexao,
    fecharConexao,
    verificarTabela,
    inserirRegistro,
    lerRegistros
}