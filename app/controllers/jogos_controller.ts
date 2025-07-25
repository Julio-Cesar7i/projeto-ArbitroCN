import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'

export default class JogosController {
    public async create({ request, response }: HttpContext) {
        const jogoData = request.only(['arbitroId'])
        const jogo = await Jogo.create(jogoData)
        return response.created(jogo)
    }
    public async index({ response }: HttpContext) {
        const jogo = await Jogo.all()
        response.send(jogo)
    }
    public async store({ request, response }: HttpContext) {
        const jogoData = request.only(['arbitroId'])
        const jogo = await Jogo.create(jogoData)
        response.created(jogo)
    }
    public async update({ params, request, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        const updateData = request.only(['arbitroId'])
        jogo.merge(updateData)
        await jogo.save()
        response.send(jogo)
    }
    public async destroy({ params, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        await jogo.delete()
        response.send('Jogo deletado')
    }
    public async show({ params, response }: HttpContext) {
        const jogo = await Jogo.query()
            .where('id', params.id)
            .preload('arbitros')
            .preload('equipes')
            .preload('atletas')
            .first()

        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }

        response.send(jogo)
    }
}