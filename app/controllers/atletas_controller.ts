//import type { HttpContext } from '@adonisjs/core/http'
// Importando o Modelo Atleta
//import Atleta from '#models/Atleta'

//export default class AtletasController {
    // Função para cadastrar os atletas
    // public async store({request, response}: HttpContext) {
    //     return await Atleta.create(request.only(['nome', 'data_nascimento', 'cpf']))

    // }
//}


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
