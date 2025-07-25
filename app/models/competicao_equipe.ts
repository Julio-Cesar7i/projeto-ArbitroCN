import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CompeticaoEquipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare competicaoId: number

  @column()
  declare equipeId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}