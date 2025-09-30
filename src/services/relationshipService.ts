import { api } from './api';
import {
  AddCompanySupplierDto,
  CompanySupplierListDto,
  CompanySupplierResponseDto,
  GetAllCompanySupplierFilterDto,
  PagedResultDto,
} from '@/types/relationship';

export const relationshipService = {
  // Get all company-supplier relationships with pagination and filters
  async getAll(filters: GetAllCompanySupplierFilterDto = {}): Promise<PagedResultDto<CompanySupplierListDto>> {
    const response = await api.get('/company-supplier', { params: filters });
    return response.data;
  },

  // Create new company-supplier relationship
  async create(data: AddCompanySupplierDto): Promise<void> {
    await api.post('/company-supplier', data);
  },

  // Delete company-supplier relationship
  async delete(companyId: number, supplierId: number): Promise<void> {
    await api.delete(`/company-supplier/${companyId}/${supplierId}`);
  },
};
