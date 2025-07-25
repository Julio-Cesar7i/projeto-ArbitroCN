//import type { HttpContext } from '@adonisjs/core/http'
// Importando o Modelo Atleta
import Atleta from '#models/atleta'
import { request } from 'http'

export default class AtletasController {

    // Função para listar os atletas
    public async index({ request }: HttpContext) {
        const equipeId = request.input('equipe_id') 
        const jogo_id = request.input('jogo_id')
        const competicaoId = request.input('competicao_id')
        
        let consulta = Atleta.query()

        if (equipeId) {
            consulta = consulta.where('equipe_id', equipeId)
        }   

        // if (jogoId) {

        // }

        const consulta_atletas = await Atleta.query().where('equipe_id', equipeId)
        return consulta_atletas
    }

    // Função para cadastrar os atletas

    public async store({ request }: HttpContext) {
        const dados = await Atleta.create(request.only(['nome', 'data_nascimento', 'cpf', 'equipeId']))
        return dados
    }

}
>>>>>>> 57e3c24 (Criei e modifiquei o atleta_controller)


// app/Controllers/Http/AtletaController.ts
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Atleta from 'App/Models/Atleta'

// export default class AtletaController {
//   public async store({ request, response }: HttpContextContract) {
//     const dados = request.only(['nome', 'data_nascimento', 'cpf', 'equipe_id'])

//     const atleta = await Atleta.create(dados)

//     return response.status(201).json(atleta)
//   }

//   public async index() {
//     return await Atleta.all()
//   }

//   public async show({ params }: HttpContextContract) {
//     const atleta = await Atleta.findOrFail(params.id)
//     return atleta
//   }

//   public async update({ request, params }: HttpContextContract) {
//     const atleta = await Atleta.findOrFail(params.id)
//     const dados = request.only(['nome', 'data_nascimento', 'cpf'])

//     atleta.merge(dados)
//     await atleta.save()

//     return atleta
//   }

//   public async destroy({ params, response }: HttpContextContract) {
//     const atleta = await Atleta.findOrFail(params.id)
//     await atleta.delete()

//     return response.status(204)
//   }
// }
