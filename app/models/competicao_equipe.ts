import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CompeticaoEquipe extends BaseModel {
  public static table = 'competicao_equipe'
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'competicao_id' })
  declare competicaoId: number

  @column({ columnName: 'equipe_id' })
  declare equipeId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}