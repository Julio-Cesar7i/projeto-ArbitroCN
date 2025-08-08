import vine from '@vinejs/vine'

export const storeEquipeValidator = vine.compile(
    vine.object({
        nome: vine.string().maxLength(30).trim(),
        responsavel: vine.string().maxLength(30).trim(),
        cpfResponsavel: vine.string().regex(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/)
        .unique(async (db, value) => {
            const equipe = await db.from('equipes').where('cpf_responsavel', value).first()
            return !equipe
        }),
        email_responsavel: vine.string().regex(/[a-z0-9]\@[a-z]\.[a-z]/).trim().maxLength(100).normalizeEmail()
        .unique(async (db, value) => {
            const equipe = await db.from('equipes').where('email_responsavel', value).first()
            return !equipe
        }), 
        telefone_responsavel: vine.string().trim().regex(/\d{8,9}/)


    })
)