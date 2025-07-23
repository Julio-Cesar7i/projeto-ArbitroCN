import type { HttpContext } from '@adonisjs/core/http'
import Arbitro from '#models/arbitro'
export default class ArbitrosController {
  public async index({ response }: HttpContext) {
    const arbitros = await Arbitro.all()
    return response.json(arbitros)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['cpf', 'nome'])
    const arbitro = await Arbitro.create(data)
    return response.status(201).json(arbitro)
  }

  public async show({ params, response }: HttpContext) {
    const arbitro = await Arbitro.findOrFail(params.id)
    return response.json(arbitro)
  }

  public async update({ params, request, response }: HttpContext) {
    const arbitro = await Arbitro.findOrFail(params.id)
    const data = request.only(['cpf', 'nome'])
    arbitro.merge(data)
    await arbitro.save()
    return response.json(arbitro)
  }

  public async destroy({ params, response }: HttpContext) {
    const arbitro = await Arbitro.findOrFail(params.id)
    await arbitro.delete()
    return response.noContent()
  }
  // Método para pesquisar árbitros por CPF
  // Retorna um árbitro se encontrado, ou um erro se não encontrado
  // Retorna um erro se o CPF não for fornecido
  public async search ({ request, response }: HttpContext ) {
    const { cpf } = request.qs()
    if (!cpf) {
      return response.status(400).json({ error: 'CPF é necessario para a pesquisa' })
    }
    const arbitro = await Arbitro.query().where('cpf', cpf).first()
    if (!arbitro) {
      return response.status(404).json({ error: 'Nenhum Arbitro encontrado!' })
    }
    return response.json(arbitro)
  }

}