import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Equipe from './equipe.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Atleta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare data_de_nascimento: Date
  
  @column()
  declare cpf: number

  @column()
  declare equipeId: number

  @belongsTo(() => Equipe, {
    foreignKey: 'equipeId'
  })
  declare equipe: BelongsTo<typeof Equipe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}