
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'arbitro_competicaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // pegando o id da tabela Arbitros
      table.integer('arbitro_id').unsigned().references('id').inTable('arbitros').onDelete('CASCADE')

      // pegando o id da tabela competicao
      table.integer('competicao_id').unsigned().references('id').inTable('competicoes').onDelete('CASCADE')

      // Garante que o mesmo árbitro não seja escalado duas vezes para a mesma competição.
      table.unique(['arbitro_id', 'competicao_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}