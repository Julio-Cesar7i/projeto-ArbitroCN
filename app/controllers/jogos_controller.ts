import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'

export default class JogosController {
    public async create({ request, response }: HttpContext) {
        const dados = request.only(['dataHora', 'competicaoId', 'status'])
        const jogo = await Jogo.create(dados)

        
        const arbitros = request.input('arbitros')
        if (arbitros) await jogo.related('arbitros').attach(arbitros)

        response.created(jogo)
    }

    public async index({ response }: HttpContext) {
        const jogos = await Jogo.query().preload('arbitros').preload('equipes').preload('atletas')
        response.send(jogos)
    }

    public async store({ request, response }: HttpContext) {
        const dados = request.only(['dataHora', 'competicaoId', 'status'])
        const jogo = await Jogo.create(dados)

        const arbitros = request.input('arbitros')
        if (arbitros) await jogo.related('arbitros').attach(arbitros)

        response.created(jogo)
    }

    public async update({ params, request, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        const updateData = request.only(['dataHora', 'competicaoId', 'status'])
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