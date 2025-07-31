import type { HttpContext } from '@adonisjs/core/http'
import Equipe from '#models/equipe'

    export default class EquipesController {

        public async index({}: HttpContext) {
            const equipes = await Equipe.all()
            return equipes
        }

        public async show({ params }: HttpContext) {
            const equipe = await Equipe.findOrFail(params.id)
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
        }
    }

