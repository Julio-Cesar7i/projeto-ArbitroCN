import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jogos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('nome')
      table.datetime('data')
      table.string('local')
      table.enum('status', ['agendado', 'em_andamento', 'concluido', 'cancelado']).defaultTo('agendado')
      table.integer('competicao_id').unsigned().references('id').inTable('competicoes').onDelete('CASCADE')
      table.integer('arbitro_id').unsigned().references('id').inTable('arbitros').onDelete('SET NULL')
      table.integer('equipe_1_id').unsigned().references('id').inTable('equipes').onDelete('SET NULL')
      table.integer('equipe_2_id').unsigned().references('id').inTable('equipes').onDelete('SET NULL')
      table.text('sumula_do_jogo').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}