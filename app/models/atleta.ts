import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipe from './equipe.js'
import Jogo from './jogo.js'

export default class Atleta extends BaseModel {


  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column()
  declare dataDeNascimento: Date

  @column()
  declare equipeId: number  | null

  @belongsTo(() => Equipe, { foreignKey: 'equipeId' })
  declare equipe: BelongsTo<typeof Equipe>

  @manyToMany(() => Jogo, { pivotTable: 'atleta_jogos' })
  declare jogos: ManyToMany<typeof Jogo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}