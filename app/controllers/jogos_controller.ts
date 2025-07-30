import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'



export default class JogosController {
    public async index({response}:  HttpContext) {
        const jogos = await Jogo.query()
            .preload('competicao')
            .preload('equipe1', (query) => {
                query.preload('atletas')
            })
            .preload('equipe2', (query) => {
                query.preload('atletas')
            })

        return response.ok(jogos)
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

        return response.ok(jogo)
    }

    public async update({ params, request, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        const updateData = request.only(['dataHora', 'competicaoId', 'status'])
        jogo.merge(updateData)
        await jogo.save()
        return response.ok(jogo)
    }

    public async destroy({ params, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        await jogo.delete()
        return response.noContent()
    }
}