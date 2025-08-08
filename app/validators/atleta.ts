import vine from '@vinejs/vine'

export const storeAtletaValidator = vine.compile(
    vine.object({
        nome: vine.string().minLength(3).maxLength(100).trim(),
        data_de_nascimento: vine.date(),
        cpf: vine.string().regex(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/),
        equipeId: vine.number().positive().nullable(),
    })
)