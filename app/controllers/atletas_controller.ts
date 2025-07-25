import type { HttpContext } from '@adonisjs/core/http'
// Importando o Modelo Atleta
import Atleta from '#models/atleta'
import { request } from 'http'
    export default class AtletasController {

        // Função para listar os atletas
        public async index({ request }: HttpContext) {
            const equipeId = request.input('equipe_id') 
            const jogoId = request.input('jogo_id')
            const competicaoId = request.input('competicao_id')
            
            let consulta = Atleta.query()

            if (equipeId) {
                consulta = consulta.where('equipe_id', equipeId)
            }   
            if (jogoId) {
                consulta = consulta.whereHas('jogos', (query) => {
                    query.where('id', jogoId)
                })
            }

            if (competicaoId) {
                consulta = consulta.whereHas('competicao', (query) => {
                    query.where('id', competicaoId)
                })
            }
            return await consulta
        }
    // public async show({ params }: HttpContext) {
    //     const atleta = 
    // }


    public async store({ request }: HttpContext) {
        const dados = await Atleta.create(request.only(['nome', 'data_nascimento', 'cpf', 'equipeId']))
        return dados
    }

    public async update({ request, params }: HttpContext) {
        const atleta = await Atleta.findOrFail(params.id)
        const dados = request.only(['nome', 'data_nascimento', 'cpf'])

        atleta.merge(dados)
        await atleta.save()

        return atleta
    }
}
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
