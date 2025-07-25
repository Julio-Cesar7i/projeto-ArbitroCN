import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Equipe from './equipe.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Jogo from '#models/jogo'
import Competicao from './competicao.js'

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

  @manyToMany(() => Jogo, {
    pivotTable: 'atleta_jogo'
  }) 
  declare jogos: ManyToMany<typeof Jogo>

  @manyToMany(() => Competicao, {
    pivotTable: 'atleta_competicao'
  })
  declare competicao: ManyToMany<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}