import type { HttpContext } from '@adonisjs/core/http'
import Jogo from '../models/jogo.js'

export default class JogosController {
    public async index({ request, response }: HttpContext) {
        const mostrarPrimeiro = request.input('primeiro', false)
        //preload ja faz o papel do inner join, então não precisamos usar o with
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
        //aqui também usamos preload para carregar as relações
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
        // Verifica se o ID do jogo é válido
        const jogo = await Jogo.find(params.id)
        if (!jogo) {
            return response.notFound('Jogo não encontrado')
        }
        // Atualiza os campos do jogo com os dados recebidos na requisição
        // O método `only` extrai apenas os campos especificados do corpo da requisição
        const updateData = request.only([
            'nome',
            'data',
            'local',
            'status',
            'competicao_id',
            'equipe_1_id',
            'equipe_2_id',
            'placar_equipe_1',
            'placar_equipe_2',
            'sumula_do_jogo'
        ])
        jogo.merge(updateData)
        await jogo.save()

        
        const arbitros = request.input('arbitros')
        if (arbitros && Array.isArray(arbitros)) {
            await jogo.related('arbitros').sync(arbitros)
        }

        return response.ok(jogo)
    }
    public async store({ request, response }: HttpContext) {
        // Cria um novo jogo com os dados recebidos na requisição
        const jogoData = request.only([
            'nome',
            'data',
            'local',
            'status',
            'competicao_id',
            'equipe_1_id',
            'equipe_2_id',
            'placar_equipe_1',
            'placar_equipe_2',
            'sumula_do_jogo'
        ])
        const jogo = await Jogo.create(jogoData)
        const arbitros = request.input('arbitros')
        if (arbitros && Array.isArray(arbitros)) {
            await jogo.related('arbitros').attach(arbitros)
        }
        return response.created(jogo)
    }

    // Método para deletar um jogo
    // Verifica se o jogo existe antes de tentar deletar
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
        // Remove a equipe 1 ou equipe 2 do jogo, conforme o parâmetro passado
        if (params.equipeCampo === '1') {
            jogo.equipe1Id = null
        } else if (params.equipeCampo === '2') {
            jogo.equipe2Id = null
        } else {
            return response.badRequest('Parâmetro equipeCampo deve ser "1" ou "2"')
        }
        await jogo.save()
        return response.ok(jogo)
    }
}

