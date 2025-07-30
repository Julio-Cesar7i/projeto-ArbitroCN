import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Jogo from './jogo.js'
import Competicao from './competicao.js'

export default class Arbitro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare CPF: string

  @column({ columnName: 'data_de_nascimento' })
  declare dataDeNascimento: Date

  @column()
  declare email: string

  @column()
  declare telefone: string

  @column()
  declare nome: string

  @manyToMany(() => Jogo, { pivotTable: 'arbitro_jogos' })
  declare jogos: ManyToMany<typeof Jogo>

  @manyToMany(() => Competicao, { pivotTable: 'arbitro_competicaos' })
  declare competicoes: ManyToMany<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}