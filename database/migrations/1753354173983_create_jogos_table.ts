import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jogos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Adicione outros campos relevantes do jogo, como data/hora, status, competicao_id, etc.
      table.string('nome')
      table.string('descricao')
      table.datetime('data')
      table.string('local')
      table.string('status') // Ex: 'agendado', 'em andamento', 'concluído'
      table.integer('competicao_id').unsigned().references('id').inTable('competicoes').onDelete('CASCADE')
      table.integer('arbitro_id').unsigned().references('id').inTable('arbitros').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}