import type { HttpContext } from '@adonisjs/core/http'
import Competicao from '#models/competicao'
import Arbitro from '#models/arbitro'
import { createCompeticaoValidator } from '../validators/competicao.js'

export default class CompeticoesController {
  public async index({ response }: HttpContext) {
    const competicoes = await Competicao.all()
    return response.ok(competicoes)
  }

  public async store({ request, response }: HttpContext) {
    const dados = await request.validateUsing(createCompeticaoValidator) /* request.only([
      'nome',
      'tipoFase',
      'regulamento',
      'localPrincipal',
      'valorInscricao',
      'limiteAtletasPorEquipe',
    ]) */
    const competicao = await Competicao.create(dados)
    return response.created(competicao)
  }

  public async show({ params, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    return response.ok(competicao)
  }

  public async update({ params, request, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    const novosDados = request.only([
      'nome',
      'tipoFase',
      'regulamento',
      'localPrincipal',
      'valorInscricao',
      'limiteAtletasPorEquipe',
    ])

    competicao.merge(novosDados)
    await competicao.save()

    return response.ok(competicao)
  }

  public async destroy({ params, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    await competicao.delete()
    return response.noContent()
  }

  public async search({ request, response }: HttpContext) {
    const { nome } = request.qs()
    if (!nome) {
      return response.status(400).json({ error: 'Nome é necessário para a pesquisa' })
    }
    const competicao = await Competicao.query().where('nome', nome).first()
    if (!competicao) {
      return response.status(404).json({ error: 'Nenhuma competição encontrada!' })
    }
    return response.json(competicao)
  }

  public async listarArbitros({ params, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    const arbitros = await competicao.related('arbitros').query()
    return response.ok(arbitros)
  }

  public async associarArbitro({ params, request, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    const { arbitro_id } = request.only(['arbitro_id'])
    await Arbitro.findOrFail(arbitro_id)
    await competicao.related('arbitros').attach([arbitro_id])
    return response.created({ message: 'Árbitro associado à competição com sucesso!' })
  }

  public async desassociarArbitro({ params, request, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.id)
    const { arbitro_id } = request.only(['arbitro_id'])
    await competicao.related('arbitros').detach([arbitro_id])
    return response.noContent()
  }
}