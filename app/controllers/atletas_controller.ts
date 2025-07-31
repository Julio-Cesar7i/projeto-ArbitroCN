import type { HttpContext } from '@adonisjs/core/http'
import Atleta from '#models/atleta'

export default class AtletasController {
  // Função para listar os atletas de acordo com os filtros
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
      consulta = consulta.whereHas('equipe', (query) => {
        query.whereHas('competicoes', (q) => {
          q.where('id', competicaoId)
        })
      })
    }

    return await consulta
  }

  // Função para mostrar um atleta específico
  public async show({ params }: HttpContext) {
    const atleta = await Atleta.findOrFail(params.id)
    return atleta
  }

  // Função para criar um novo atleta
  public async store({ request }: HttpContext) {
    const dados = request.only(['nome', 'data_nascimento', 'cpf', 'equipeId'])
    const atleta = await Atleta.create(dados)
    return atleta
  }

  // Função para atualizar um atleta existente
  public async update({ request, params }: HttpContext) {
    const atleta = await Atleta.findOrFail(params.id)
    const dados = request.only(['nome', 'data_nascimento', 'cpf'])
    atleta.merge(dados)
    await atleta.save()
    return atleta
  }

  // Função para deletar um atleta
  public async destroy({ params }: HttpContext) {
    const atleta = await Atleta.findOrFail(params.id)
    await atleta.delete()
  }
}
