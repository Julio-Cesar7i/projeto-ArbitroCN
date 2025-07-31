import router from '@adonisjs/core/services/router'
import ArbitrosController from '../app/controllers/arbitros_controller.js'
import CompeticoesController from '../app/controllers/competicoes_controller.js'
import JogosController from '../app/controllers/jogos_controller.js'
import EquipesController from '../app/controllers/equipes_controller.js'
import AtletasController from '../app/controllers/atletas_controller.js'

// router.get('/', async () => ({ hello: 'world' }))

router.resource('/arbitros', ArbitrosController).apiOnly()
router.resource('/competicoes', CompeticoesController).apiOnly()
router.resource('/jogos', JogosController).apiOnly()
router.resource('equipe', EquipesController).apiOnly()
router.resource('/atletas', AtletasController).apiOnly()

