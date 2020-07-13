//Importando o express para dentro do index.js
const express  = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Felipe Frota'
    });
})

app.listen(3333);