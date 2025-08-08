import vine from '@vinejs/vine'

export const createArbitroValidator = vine.compile(
  vine.object({
    cpf: vine.string().minLength(11).maxLength(14),
    nome: vine.string(),
    email: vine.string().email(),
    telefone: vine.string(),
    data_de_nascimento: vine.date(),
  })
) 