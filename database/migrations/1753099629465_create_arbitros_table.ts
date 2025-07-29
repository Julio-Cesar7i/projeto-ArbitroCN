import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'arbitros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.string('cpf', 11).notNullable().unique()
      table.string('nome', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('telefone', 15).notNullable()
      table.date('data_de_nascimento').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}