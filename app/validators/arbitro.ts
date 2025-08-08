import vine from '@vinejs/vine'

export const createArbitroValidator = vine.compile(
  vine.object({
    cpf: vine
      .string()
      .regex(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/)
      .unique(async (db, value) => {
        const arbitro = await db.from('arbitros').where('cpf', value).first()
        return !arbitro
      }),

    nome: vine.string().minLength(2).maxLength(100),

    email: vine
      .string()
      .email()
      .trim()
      .maxLength(100)
      .unique(async (db, value) => {
        const arbitro = await db.from('arbitros').where('email', value).first()
        return !arbitro
      }),

    telefone: vine.string().trim().regex(/^\d{8,9}$/),

    data_de_nascimento: vine.date(),
  })
)