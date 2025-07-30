import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Competicao from './competicao.js'

export default class ArbitroCompeticao extends BaseModel {
  public static table = 'arbitro_competicaos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'arbitro_id' })
  declare arbitroId: number

  @column({ columnName: 'competicao_id' })
  declare competicaoId: number

  @belongsTo(() => Arbitro)
  declare arbitro: BelongsTo<typeof Arbitro>

  @belongsTo(() => Competicao)
  declare competicao: BelongsTo<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}