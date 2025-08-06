import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'
import { createJogoValidator } from '#validators/jogo'
import { DateTime } from 'luxon'

export default class JogosController {
    public async index({ request, response }: HttpContext) {
        const mostrarPrimeiro = request.input('primeiro', false)
        const query = Jogo.query()
            .preload('competicao')
            .preload('equipe1', (q) => q.preload('atletas'))
            .preload('equipe2', (q) => q.preload('atletas'))
            .preload('arbitros')

        if (mostrarPrimeiro) {
            const jogo = await query.first()
            return response.ok(jogo)
        } else {
            const jogos = await query
            return response.ok(jogos)
        }
    }

    public async show({ params, response }: HttpContext) {
        const jogo = await Jogo.query()
            .where('id', params.id)
            .preload('competicao')
            .preload('equipe1', (q) => q.preload('atletas'))
            .preload('equipe2', (q) => q.preload('atletas'))
            .preload('arbitros')
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

        // Validação dos dados de atualização
        const data = await request.validateUsing(createJogoValidator)
        // Cria uma cópia e converte o campo data para DateTime
        const dataToUpdate = { ...data, data: DateTime.fromJSDate(data.data as Date) }

        jogo.merge(dataToUpdate)
        await jogo.save()

        const arbitros = request.input('arbitros')
        if (arbitros && Array.isArray(arbitros)) {
            await jogo.related('arbitros').sync(arbitros)
        }

        return response.ok(jogo)
    }

    public async store({ request, response }: HttpContext) {
        // Validação dos dados de criação
        const data = await request.validateUsing(createJogoValidator)
        // Cria uma cópia e converte o campo data para DateTime
        const dataToCreate = { ...data, data: DateTime.fromJSDate(data.data as Date) }

        const jogo = await Jogo.create(dataToCreate)
        const arbitros = request.input('arbitros')
        if (arbitros && Array.isArray(arbitros)) {
            await jogo.related('arbitros').attach(arbitros)
        }
        return response.created(jogo)
    }

    public async destroy({ params, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        await jogo.delete()
        return response.noContent()
    }

    public async removerArbitro({ params, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        await jogo.related('arbitros').detach([params.arbitroId])
        return response.noContent()
    }

    public async removerEquipe({ params, response }: HttpContext) {
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        if (params.equipeCampo === '1') {
            jogo.equipe1Id = null
        } else if (params.equipeCampo === '2') {
            jogo.equipe2Id = null
        } else {
            return response.badRequest('Parâmetro equipeCampo deve ser "1" ou "2"')
        }
        await jogo.save()
        return response.noContent()
    }
}