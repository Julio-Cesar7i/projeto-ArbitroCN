import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Jogo from './jogo.js'
import Competicao from './competicao.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Arbitro extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare CPF: string

  @column()
  declare nome: string

  @column()
  declare arbitroId: number 

  @column() 
  declare competicaoId: number

  @hasMany(() => Jogo)
  declare jogos: HasMany<typeof Jogo>

  @manyToMany(() => Competicao, {
    pivotTable: 'arbitro_competicao',
  })

  
  declare competicoes: ManyToMany<typeof Competicao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}