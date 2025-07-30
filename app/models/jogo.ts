import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, belongsTo} from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipe from './equipe.js'
import Competicao from './competicao.js'
import Atleta from './atleta.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
  declare competicaoId: number | null

  @column()
  declare arbitroId: number | null

  @column()
  declare equipe1Id: number | null

  @column()
  declare equipe2Id: number | null  

  @belongsTo(() => Equipe, {
    foreignKey: 'equipe1Id',
    localKey: 'id'
  })
  declare equipe1: BelongsTo<typeof Equipe>

  @belongsTo(() => Equipe, {
    foreignKey: 'equipe2Id',
    localKey: 'id'
  })
  declare equipe2: BelongsTo<typeof Equipe>
  @manyToMany(() => Arbitro, { 
    pivotTable: 'arbitro_jogo' 
  })
  declare arbitros: ManyToMany<typeof Arbitro>

  @manyToMany(() => Equipe, { 
    pivotTable: 'equipe_jogo' 
  })
  declare equipes: ManyToMany<typeof Equipe>

  @manyToMany(() => Atleta, { 
    pivotTable: 'atleta_jogo' 
  })
  declare atletas: ManyToMany<typeof Atleta>

  @belongsTo(() => Competicao)
  declare competicao: BelongsTo<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}