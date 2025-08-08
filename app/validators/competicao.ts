import vine from '@vinejs/vine'


export const createCompeticaoValidator = vine.compile(
    vine.object({
        nome: vine.string().minLength(2).maxLength(30),

        tipo_fase: vine.enum(['fase_de_grupo','mata-mata','pontos_corridos']).optional(),// Torna o campo opcional na validação
        regulamento: vine
        .string()
        .trim()
        .maxLength(20000)
        .nullable(),

        local_principal: vine.string().nullable(),

        valor_inscricao: vine.number().min(0).decimal([0, 2]).optional(),

        limite_atletas_por_equipe: vine.number().decimal(0).min(0).nullable()


    })
)