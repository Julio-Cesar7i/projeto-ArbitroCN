import type { HttpContext } from '@adonisjs/core/http'
import Equipe from '#models/equipe'
import Atleta from '#models/atleta'

export default class EquipesController {

    public async index({}: HttpContext) {
        const equipes = await Equipe.query().preload('atletas')
        return equipes
    }

    public async show({ params }: HttpContext) {
        const equipe = await Equipe.query().where('id', params.id).preload('atletas').firstOrFail()
        return equipe
    }

    public async store({ request }: HttpContext) {
        const dados = await Equipe.create(request.only(['nome', 'responsavel', 'cpf_responsavel', 'email_responsavel', 'telefone_responsavel']))
        return dados
    }

    public async update({ request, params }: HttpContext) {
        const equipe = await Equipe.findOrFail(params.id)
        const dados = request.only(['nome', 'responsavel', 'cpf_responsavel', 'email_responsavel', 'telefone_responsavel'])

        equipe.merge(dados)
        await equipe.save()

        return equipe
    }

    public async destroy({ params }: HttpContext) {
        const equipe = await Equipe.findOrFail(params.id)
        await equipe.delete()
        return { message: 'Equipe removida com sucesso' }
    }

    public async atualizarAtletas({ params, request, response }: HttpContext) {
        const equipe = await Equipe.find(params.equipeId)
        if (!equipe) {
            return response.notFound('Equipe não encontrada')
        }
        const atletasIds = request.input('atletas')
        if (!Array.isArray(atletasIds)) {
            return response.badRequest('Envie um array de IDs de atletas')
        }
        // Remove todos os atletas da equipe
        await Atleta.query().where('equipeId', params.equipeId).update({ equipeId: null })
        // Atualiza os atletas enviados para pertencerem à equipe
        if (atletasIds.length > 0) {
            await Atleta.query().whereIn('id', atletasIds).update({ equipeId: params.equipeId })
        }
        return response.ok({ message: 'Atletas atualizados na equipe' })
    }

    public async removerAtleta({ params, response }: HttpContext) {
        const atleta = await Atleta.find(params.atletaId)
        if (!atleta) {
            return response.notFound('Atleta não encontrado')
        }
        if (atleta.equipeId !== Number(params.equipeId)) {
            return response.badRequest('Atleta não pertence a esta equipe')
        }
        atleta.equipeId = null
        await atleta.save()
        return response.noContent()
    }
}