import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'competicao_equipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('competicao_id').unsigned().references('id').inTable('competicoes').onDelete('CASCADE')
      
      table.integer('equipe_id').unsigned().references('id').inTable('equipes').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}