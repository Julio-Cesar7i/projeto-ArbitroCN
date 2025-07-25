import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Arbitro from './arbitro.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipe from './equipe.js'
import Atleta from './atleta.js'

export default class Jogo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare arbitroId: number
 
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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}