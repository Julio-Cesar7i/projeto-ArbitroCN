import type { HttpContext } from '@adonisjs/core/http'
import Competicao from '#models/competicao'

export default class CompeticaoController {

    public async index({response}: HttpContext) {
        const competicoes = await Competicao.all()
        return response.ok(competicoes)
    }

    public async store({request, response}: HttpContext) {
        const dados = request.only([
            'nome','tipoFase','regulamento','localPrincipal','valorInscricao','limiteAtletasPorEquipe',
        ])

        const competicao = await Competicao.create(dados)

        return response.created(competicao)
    }

    public async show({params,response}: HttpContext) {
        const competicao = await Competicao.findOrFail(params.id)
        return response.ok(competicao)
    }

    public async update({ params,request,response}: HttpContext) {
        const competicao = await Competicao.findOrFail(params.id)
        const novosDados = request.only([
            'nome',
            'tipoFase',
            'regulamento',
            'localPrincipal',
            'valorInscricao',
            'limiteAtletasPorEquipe',
        ])

        await competicao.save()

        return response.ok(competicao)
    }

    public async destroy({ params,response}: HttpContext) {
        const competicao = await Competicao.findOrFail(params.id)
        await competicao.delete()

        return response.noContent()
    }
    // Método para pesquisar competições por nome
    // Retorna uma competição se encontrada, ou um erro se não encontrada
    // Retorna um erro se o nome não for fornecido
    public async search({ request, response }: HttpContext) {
        const { nome } = request.qs()
        if (!nome) {
            return response.status(400).json({ error: 'Nome é necessário para a pesquisa' })
        }
        const competicao = await Competicao.query().where('nome', nome).first()
        if (!competicao) {
            return response.status(404).json({ error: 'Nenhuma competição encontrada!' })
        }
        return response.json(competicao)
    }
}