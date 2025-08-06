import type { HttpContext } from '@adonisjs/core/http'
import Arbitro from '#models/arbitro'
import { createArbitroValidator } from '#validators/arbitro'

export default class ArbitrosController {
  public async index({ response }: HttpContext) {
    const arbitros = await Arbitro.all()
    return response.json(arbitros)
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createArbitroValidator)
    const arbitro = await Arbitro.create(data)
    return response.status(201).json(arbitro)
  }

  public async show({ params, response }: HttpContext) {
    const arbitro = await Arbitro.findOrFail(params.id)
    return response.json(arbitro)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(createArbitroValidator)
    const arbitro = await Arbitro.findOrFail(params.id)
    arbitro.merge(data)
    await arbitro.save()
    return response.json(arbitro)
  }
   public async destroy({ params, response }: HttpContext) {
    const arbitro = await Arbitro.findOrFail(params.id)
    await arbitro.delete()
    return response.noContent()
  }
}
