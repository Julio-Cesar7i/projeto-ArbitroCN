/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CompeticaoController from '#controllers/competicao_controller'
import ArbitrosController from '#controllers/arbitros_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/competicoes', CompeticaoController).apiOnly()
router.resource('/arbitros', ArbitrosController).apiOnly()