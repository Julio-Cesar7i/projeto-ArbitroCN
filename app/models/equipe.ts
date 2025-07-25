import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Competicao from '#models/competicao'
import Atleta from '#models/atleta'

export default class Equipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare responsavel: string

  @manyToMany(() => Competicao, {
    pivotTable: 'competicao_equipe'
  })
  declare competicoes: ManyToMany<typeof Competicao>

  @hasMany (() => Atleta, {
    foreignKey: 'equipeId'
  })
  declare atletas: HasMany<typeof Atleta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}