import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import Jogo from './jogo.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ArbitroJogo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'arbitro_id' })
  declare arbitroId: number

  @column({ columnName: 'jogo_id' })
  declare jogoId: number

  @belongsTo(() => Arbitro) 
  declare arbitro: BelongsTo<typeof Arbitro>

  @belongsTo(() => Jogo)
  declare jogo: BelongsTo<typeof Jogo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}