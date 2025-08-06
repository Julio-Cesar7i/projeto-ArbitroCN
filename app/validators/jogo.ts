import vine from '@vinejs/vine'

export const createJogoValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(2),
    data: vine.date(),
    local: vine.string().minLength(2),
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