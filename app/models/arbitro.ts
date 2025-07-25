import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Jogo from './jogo.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'


export default class Arbitro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cpf: string

  @column()
  declare nome: string

  @hasMany(() => Jogo)
  declare jogos: HasMany<typeof Jogo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}