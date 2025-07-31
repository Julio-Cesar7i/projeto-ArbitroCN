import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipe from './equipe.js'
import Arbitro from './arbitro.js'

export default class Competicao extends BaseModel {
  public static table = 'competicoes'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column({ columnName: 'tipo_fase' })
  declare tipoFase: string

  @column()
  declare regulamento: string | null

  @column({ columnName: 'local_principal' })
  declare localPrincipal: string | null

  @column({ columnName: 'valor_inscricao' })
  declare valorInscricao: number

  @column({ columnName: 'limite_atletas_por_equipe' })
  declare limiteAtletasPorEquipe: number | null

  @manyToMany(() => Equipe, { pivotTable: 'competicao_equipes' })
  declare equipes: ManyToMany<typeof Equipe>

  @manyToMany(() => Arbitro, { pivotTable: 'arbitro_competicoes' })
  declare arbitros: ManyToMany<typeof Arbitro>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}