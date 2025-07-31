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
  @column({ columnName: 'sumula_do_jogo' })

  declare sumulaDoJogo: string | null

  @column( { columnName: 'placar_equipe_1' })
  declare placarEquipe1: number | null

  @column( { columnName: 'placar_equipe_2' })
  declare placarEquipe2: number | null

  @column( { columnName: 'equipe_1_id' })
  declare equipe1Id: number | null

  @column( { columnName: 'equipe_2_id' })
  declare equipe2Id: number | null

  @column(  { columnName: 'competicao_id' })
  declare competicaoId: number | null

  @belongsTo(() => Competicao, { foreignKey: 'competicaoId' })
  declare competicao: BelongsTo<typeof Competicao>

  @belongsTo(() => Equipe, { foreignKey: 'equipe1Id' })
  declare equipe1: BelongsTo<typeof Equipe>

  @belongsTo(() => Equipe, { foreignKey: 'equipe2Id' })
  declare equipe2: BelongsTo<typeof Equipe>

  @manyToMany(() => Arbitro, { 
    pivotTable: 'arbitro_jogos' 
  })
  declare arbitros: ManyToMany<typeof Arbitro>

  @manyToMany(() => Atleta, { pivotTable: 'atleta_jogos' })
  declare atletas: ManyToMany<typeof Atleta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}