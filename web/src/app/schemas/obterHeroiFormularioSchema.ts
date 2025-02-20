import { z } from 'zod';

export const obterHeroiFormularioSchema = () => z.object({
  id: z.number().optional(),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  nomeHeroi: z.string().min(2, 'Nome de herói deve ter pelo menos 2 caracteres'),
  dataNascimento: z.date().nullable().optional(),
  altura: z.number().positive('Altura deve ser um valor positivo'),
  peso: z.number().positive('Peso deve ser um valor positivo')
});

export type HeroiSchemaType = z.infer<ReturnType<typeof obterHeroiFormularioSchema>>;