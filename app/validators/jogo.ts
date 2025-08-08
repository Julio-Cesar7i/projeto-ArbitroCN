import vine from '@vinejs/vine'

export const createJogoValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(2).trim(),
    data: vine.date({
      formats: [
        'yyyy-MM-dd HH:mm',
        "yyyy-MM-dd'T'HH:mm",
        'yyyy-MM-dd HH:mm',
        "yyyy-MM-dd'T'HH:mm",
        'dd-MM-yyyy HH:mm',
      ],
    }),
    local: vine.string().minLength(2).trim(),
    status: vine.enum(['agendado', 'em_andamento', 'concluido', 'cancelado']),
    competicao_id: vine.number(),
    equipe_1_id: vine.number(),
    equipe_2_id: vine.number(),
    placar_equipe_1: vine.number().optional(),
    placar_equipe_2: vine.number().optional(),
    sumula_do_jogo: vine.string().optional(),
    arbitros: vine.array(vine.number()).optional(),
  })
)