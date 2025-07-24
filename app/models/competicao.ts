import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipe from '#models/equipe'

export default class Competicao extends BaseModel {
  public static table = 'competicoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome:string

  @column()
  declare tipoFase:string

  @column()
  declare regulamento: string | null

  @column()
  declare localPrincipal: string | null

  @column()
  declare valorInscricao: number

  @column()
  declare limiteAtletasPorEquipe: number | null

  // @manyToMany (() => Equipe, {
  //   pivotTable: 'competicao_equipe'
  // })
  // declare equipes: ManyToMany<typeof Equipe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}