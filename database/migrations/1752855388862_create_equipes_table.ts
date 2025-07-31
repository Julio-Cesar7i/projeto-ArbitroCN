import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'equipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // id da equipe
      table.increments('id')
      // Nome da equipe com o tipo string e usei o .notNullable pra ser obrigatório escrever nesse campo
      table.string('nome', 100).notNullable() 
      // Quem está a frente da equipe, a mesma coisa que o nome da equipe
      table.string('responsavel').notNullable()
      table.string('cpf_responsavel', 15).notNullable()
      table.string('email_responsavel', 100).notNullable()
      table.string('telefone_responsavel', 15).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}