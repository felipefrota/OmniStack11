const connection = require('../database/connection');
// const { index } = require('./OngController');
// const { delete } = require('../database/connection');

module.exports = {
    //Listagem Incidentes
    async index(request, response) {
        //Paginação
        const { page = 1 } = request.query;

        //Mostrando a quantidade de incidentes abertos
        const [count] = await connection('incidents').count();

        //Continuação da paginação. Esta limitando 5 incidentes por pagina
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        //Serve para mostrar ao front-end quantos registros tem
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    //Cadastro Incidentes
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description, 
            value,
            ong_id,
        })

        return response.json({ id })
    },

    //Delete um Incidente
    async delete(request, response){
        const { id }  = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};