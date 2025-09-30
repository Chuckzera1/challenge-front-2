import { api } from './api';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  SupplierListDto,
  GetAllSupplierFilterDto,
} from '@/types/supplier';
import { PagedResultDto } from '@/types/shared';

export const supplierService = {
  async getAll(filters: GetAllSupplierFilterDto = {}): Promise<PagedResultDto<SupplierListDto>> {
    const response = await api.get('/supplier', { params: filters });
    return response.data;
  },


  async create(data: CreateSupplierDto): Promise<SupplierListDto> {
    const response = await api.post('/supplier', data);
    return response.data;
  },

  async update(id: number, data: UpdateSupplierDto): Promise<SupplierListDto> {
    const response = await api.put(`/supplier/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/supplier/${id}`);
  },
};
