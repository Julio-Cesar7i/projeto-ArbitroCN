import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Competicao from './competicao.js'
import Atleta from './atleta.js'

export default class Equipe extends BaseModel {
  public static table = 'equipes'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare responsavel: string

  @column({ columnName: 'cpf_responsavel' })
  declare cpfResponsavel: string

  @column({ columnName: 'email_responsavel' })
  declare emailResponsavel: string

  @column({ columnName: 'telefone_responsavel' })
  declare telefoneResponsavel: string

  @manyToMany(() => Competicao, { pivotTable: 'competicao_equipes' })
  declare competicoes: ManyToMany<typeof Competicao>

  @hasMany(() => Atleta, { foreignKey: 'equipeId' })
  declare atletas: HasMany<typeof Atleta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}