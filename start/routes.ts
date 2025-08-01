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
router.resource('/equipes', EquipesController).apiOnly()
router.resource('/atletas', AtletasController).apiOnly()

router.put('/equipes/:equipeId/atletas', [EquipesController, 'atualizarAtletas'])

router.delete('/jogos/:id/arbitros/:arbitroId', [JogosController, 'removerArbitro'])
router.delete('/jogos/:id/equipe/:equipeCampo', [JogosController, 'removerEquipe'])
router.delete('/equipes/:equipeId/atletas/:atletaId', [EquipesController, 'removerAtleta'])