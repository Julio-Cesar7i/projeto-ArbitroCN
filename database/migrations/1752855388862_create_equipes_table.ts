import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'equipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      // Nome da equipe com o tipo string e usei o .notNullable pra ser obrigatório escrever nesse campo
      table.string('nome', 100).notNullable() 
      // Quem está a frente da equipe, a mesma coisa que o nome da equipe
      table.string('responsável').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}