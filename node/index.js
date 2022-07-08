const express = require("express");
const { abrirConexao, fecharConexao, verificarTabela, inserirRegistro, lerRegistros } = require("./db");
const app = express();
const port = 3000;

(async function init(){

    await abrirConexao();
    await verificarTabela();
    await fecharConexao();

    app.get('/', async (req, res) => {

        await abrirConexao();
        await inserirRegistro();
        const registros = await lerRegistros();
        await fecharConexao();

        res.send(`
            <h1>Full Cycle</h1>
            <ul>
                ${registros.map((registro) => `<li>${registro.name}</li>`).join('')}
            </ul>
        `);
    });

    app.listen(port, ()=> {
        console.log('Rodando na porta '+port);
    });

})();