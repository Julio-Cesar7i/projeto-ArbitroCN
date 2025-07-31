import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, belongsTo } from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import type { ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Equipe from './equipe.js'
import Competicao from './competicao.js'
import Atleta from './atleta.js'

export default class Jogo extends BaseModel {
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare local: string

  @column.dateTime()
  declare data: DateTime

  @column()
  declare status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado'

  @column()
  declare sumulaDoJogo: string | null

  @column()
  declare placarEquipe1: number | null

  @column()
  declare placarEquipe2: number | null

  @column()
  declare equipe1Id: number | null

  @column()
  declare equipe2Id: number | null

  @column()
  declare competicaoId: number | null

  @belongsTo(() => Competicao, { foreignKey: 'competicaoId' })
  declare competicao: BelongsTo<typeof Competicao>

  @belongsTo(() => Equipe, { foreignKey: 'equipe1Id' })
  declare equipe1: BelongsTo<typeof Equipe>

  @belongsTo(() => Equipe, { foreignKey: 'equipe2Id' })
  declare equipe2: BelongsTo<typeof Equipe>

  @manyToMany(() => Arbitro, { pivotTable: 'arbitro_jogos' })
  declare arbitros: ManyToMany<typeof Arbitro>

  @manyToMany(() => Atleta, { pivotTable: 'atleta_jogos' })
  declare atletas: ManyToMany<typeof Atleta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}