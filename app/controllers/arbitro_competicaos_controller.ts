import type { HttpContext } from '@adonisjs/core/http'
import Competicao from '#models/competicao'
import Arbitro from '#models/arbitro'

export default class ArbitroCompeticaoController {
  
//Associa um árbitro a uma competição 
  public async store({ params, request, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.competicaoId)
    const { arbitroId } = request.only(['arbitroId'])

    // Valida se o árbitro existe antes de associar
    await Arbitro.findOrFail(arbitroId)

    // O método attach() cria a ligação na tabela pivô.
    await competicao.related('arbitros').attach([arbitroId])

    return response.created({ message: 'Árbitro associado com sucesso!' })
    }

    public async index({ params, response }: HttpContext) {
    // Encontre a competição e salve na variável 'competicao'
    const competicao = await Competicao.findOrFail(params.competicaoId)

    // Use a variável 'competicao' para buscar os árbitros relacionados
    const arbitros = await competicao.related('arbitros').query()
    
    // Retorne a lista de árbitros
    return response.ok(arbitros)

    }
    public async destroy({ params, response }: HttpContext) {
    const competicao = await Competicao.findOrFail(params.competicaoId)

    // O método detach() remove a ligação da tabela pivô.
    await competicao.related('arbitros').detach([params.arbitroId])

    return response.noContent()
    
    }
}