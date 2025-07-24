import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Competicao from './competicao.js'

export default class Arbitro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cpf: string

  @column()
  declare nome: string

  @manyToMany(() => Competicao, {
    pivotTable: 'arbitro_competicao',
  })
  
  declare competicoes: ManyToMany<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}