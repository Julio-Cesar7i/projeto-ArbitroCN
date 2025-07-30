import router from '@adonisjs/core/services/router'
import CompeticaoController from '../app/controllers/competicao_controller.js'
import ArbitrosController from '../app/controllers/arbitros_controller.js'
import AtletasController from '../app/controllers/atletas_controller.js'
import JogosController from '../app/controllers/jogos_controller.js'
import EquipesController from '#controllers/equipes_controller'

router.get('/', async () => ({ hello: 'world' }))

router.resource('/competicoes', CompeticaoController).apiOnly()
router.resource('/arbitros', ArbitrosController).apiOnly()
router.resource('/atletas', AtletasController).apiOnly()
router.resource('/jogos', JogosController).apiOnly()
router.resource('/equipes', EquipesController,).apiOnly()
