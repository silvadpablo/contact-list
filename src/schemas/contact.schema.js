import { z } from "zod"

export const contactSchema = z.object({
    nome: z
        .string()
        .min(5, 'Use mais de cinco caracteres')
        .max(20, 'Use no máximo 20 caracteres'),
    email: z
        .string()
        .email('Email inválido'),
    telefone: z
        .string()
        .regex(
            /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{4})\-?(\d{4}))$/,
            'Telefone deve obedecer o formato DD 90000-0000'
        )
})

export const editContactSchema = contactSchema.partial()