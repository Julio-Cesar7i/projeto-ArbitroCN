import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'atletas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome', 100).notNullable()
      table.date('data_de_nascimento').notNullable()
      table.string('CPF').notNullable()

      table.integer('equipe_id').unsigned().references('id').inTable('equipes').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}