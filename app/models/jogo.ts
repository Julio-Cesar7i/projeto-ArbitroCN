import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Jogo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare arbitroId: number

  @belongsTo(() => Arbitro)
  declare arbitros: BelongsTo<typeof Arbitro>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}