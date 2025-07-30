import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'

export default class JogosController {
    public async index({ response }: HttpContext) {
        const jogos = await Jogo.query().preload('arbitros').preload('equipes').preload('atletas')
        return response.ok(jogos)
    }

    public async store({ request, response }: HttpContext) {
        const dados = request.only(['dataHora', 'competicaoId', 'status', 'nome','local','equipe1Id', 'equipe2Id', 'escalacaoEquipe1Id', 'escalacaoEquipe2Id', 'sumulaDoJogo'])
        const jogo = await Jogo.create(dados)

        const arbitros = request.input('arbitros')
        if (arbitros) await jogo.related('arbitros').attach(arbitros)

        
        const equipes = request.input('equipes')
        if (equipes) await jogo.related('equipes').attach(equipes)
        const atletas = request.input('atletas')
        if (atletas) await jogo.related('atletas').attach(atletas)

        return response.created(jogo)
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