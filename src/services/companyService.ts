import { api } from './api';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  CompanyListDto,
  GetAllCompanyFilterDto,
} from '@/types/company';
import { PagedResultDto } from '@/types/shared';

export const companyService = {
  // Get all companies with pagination and filters
  async getAll(filters: GetAllCompanyFilterDto = {}): Promise<PagedResultDto<CompanyListDto>> {
    const response = await api.get('/company', { params: filters });
    return response.data;
  },


  // Create new company
  async create(data: CreateCompanyDto): Promise<CompanyListDto> {
    const response = await api.post('/company', data);
    return response.data;
  },

  // Update company
  async update(id: number, data: UpdateCompanyDto): Promise<CompanyListDto> {
    const response = await api.put(`/company/${id}`, data);
    return response.data;
  },

  // Delete company
  async delete(id: number): Promise<void> {
    await api.delete(`/company/${id}`);
  },
};
