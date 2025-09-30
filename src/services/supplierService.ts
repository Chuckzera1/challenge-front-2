import { api } from './api';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  SupplierListDto,
  SupplierResponseDto,
  GetAllSupplierFilterDto,
  PagedResultDto,
} from '@/types/supplier';

export const supplierService = {
  // Get all suppliers with pagination and filters
  async getAll(filters: GetAllSupplierFilterDto = {}): Promise<PagedResultDto<SupplierListDto>> {
    const response = await api.get('/supplier', { params: filters });
    return response.data;
  },

  // Get supplier by ID
  async getById(id: number): Promise<SupplierResponseDto> {
    const response = await api.get(`/supplier/${id}`);
    return response.data;
  },

  // Create new supplier
  async create(data: CreateSupplierDto): Promise<SupplierResponseDto> {
    const response = await api.post('/supplier', data);
    return response.data;
  },

  // Update supplier
  async update(id: number, data: UpdateSupplierDto): Promise<SupplierResponseDto> {
    const response = await api.put(`/supplier/${id}`, data);
    return response.data;
  },

  // Delete supplier
  async delete(id: number): Promise<void> {
    await api.delete(`/supplier/${id}`);
  },
};
