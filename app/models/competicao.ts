import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}