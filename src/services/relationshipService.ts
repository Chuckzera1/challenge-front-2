import { api } from './api';
import {
  AddCompanySupplierDto,
} from '@/types/relationship';

export const relationshipService = {
  async create(data: AddCompanySupplierDto): Promise<void> {
    await api.post('/company-supplier', data);
  },

  async delete(companyId: number, supplierId: number): Promise<void> {
    await api.delete(`/company-supplier/${companyId}/${supplierId}`);
  },
};
