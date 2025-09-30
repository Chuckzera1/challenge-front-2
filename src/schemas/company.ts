import { z } from 'zod';

export const createCompanySchema = z.object({
  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .default('')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 14, {
      message: 'CNPJ deve ter exatamente 14 dígitos'
    }),
  fantasyName: z
    .string()
    .min(1, 'Nome fantasia é obrigatório')
    .min(2, 'Nome fantasia deve ter pelo menos 2 caracteres')
    .default(''),
  zipCode: z
    .string()
    .min(1, 'CEP é obrigatório')
    .default('')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 8, {
      message: 'CEP deve ter exatamente 8 dígitos'
    }),
});

export const updateCompanySchema = z.object({
  fantasyName: z
    .string()
    .min(1, 'Nome fantasia é obrigatório')
    .min(2, 'Nome fantasia deve ter pelo menos 2 caracteres')
    .default(''),
});

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;
export type UpdateCompanyFormData = z.infer<typeof updateCompanySchema>;
