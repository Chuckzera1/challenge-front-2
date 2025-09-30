import { api } from './api';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  CompanyListDto,
  GetAllCompanyFilterDto,
} from '@/types/company';
import { PagedResultDto } from '@/types/shared';

export const companyService = {
  async getAll(filters: GetAllCompanyFilterDto = {}): Promise<PagedResultDto<CompanyListDto>> {
    const response = await api.get('/company', { params: filters });
    return response.data;
  },


  async create(data: CreateCompanyDto): Promise<CompanyListDto> {
    const response = await api.post('/company', data);
    return response.data;
  },

  async update(id: number, data: UpdateCompanyDto): Promise<CompanyListDto> {
    const response = await api.put(`/company/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/company/${id}`);
  },
};
