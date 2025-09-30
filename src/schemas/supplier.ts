import { z } from 'zod';
import { PersonType } from '@/types/supplier';

export const createSupplierSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  zipCode: z.string().min(8, 'CEP deve ter 8 dígitos').max(8, 'CEP deve ter 8 dígitos'),
  type: z.nativeEnum(PersonType, { message: 'Tipo de pessoa é obrigatório' }),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  rg: z.string().optional(),
  birthDate: z.string().optional(),
}).refine((data) => {
  if (data.type === PersonType.Individual) {
    return data.cpf && data.rg && data.birthDate && !data.cnpj;
  }
  if (data.type === PersonType.Company) {
    return data.cnpj && !data.cpf && !data.rg && !data.birthDate;
  }
  return true;
}, {
  message: 'Campos obrigatórios não preenchidos para o tipo selecionado',
  path: ['type']
});

export const updateSupplierSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  zipCode: z.string().min(8, 'CEP deve ter 8 dígitos').max(8, 'CEP deve ter 8 dígitos'),
  birthDate: z.string().optional(),
});
