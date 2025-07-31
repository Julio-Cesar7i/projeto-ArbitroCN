import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'competicoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('nome', 255).notNullable()
      // enum é usado para que ele aceite como parametro apenas uma dessas tres opcoes
      table.enum('tipo_fase',['fase_de_grupo','mata-mata','pontos_corridos']).defaultTo('pontos_corridos')
      // nullable é para que ele possa receber como parametro o valor null (nada)
      table.text('regulamento').nullable()
      table.string('local_principal').nullable()
      // O número pode ter até 10 dígitos no total, sendo que 2 deles são para os centavos. (Ex: R$ 123.456,78).
      table.decimal('valor_inscricao',10,2).defaultTo(0)
      table.integer('limite_atletas_por_equipe').unsigned().nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}