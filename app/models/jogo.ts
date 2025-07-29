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

  
    @column.dateTime()
  declare dataHora: DateTime

  @belongsTo(() => Competicao)
  declare competicao: BelongsTo<typeof Competicao>

  @column()
  declare status: string 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}