const express = require('express');
const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

//Listagem de ongs
routes.get('/ongs', OngController.index);
//Cadastro de Ongs
routes.post('/ongs', OngController.create);

//Listar Casos Especificos
routes.get('/profile', ProfileController.index);

//Listagem Incidentes
routes.get('/incidents', IncidentController.index);
//Cadastro Incidentes
routes.post('/incidents', IncidentController.create);
//Delete um Incidente
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;