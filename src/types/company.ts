import { PaginationDto, PagedResultDto } from './shared';

export interface CreateCompanyDto {
  cnpj: string;
  fantasyName: string;
  zipCode: string;
}

export interface UpdateCompanyDto {
  fantasyName: string;
}

export interface CompanyListDto {
  id: number;
  cnpj: string;
  fantasyName: string;
  zipCode: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  companySuppliers: CompanySupplierListDto[];
}

export interface CompanySupplierListDto {
  id: number;
  companyId: number;
  supplierId: number;
  supplier: SupplierBasicDto;
}

export interface SupplierBasicDto {
  id: number;
  name: string;
  email: string;
  zipCode: string;
  cpf?: string;
  cnpj?: string;
  rg?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllCompanyFilterDto {
  page?: number;
  limit?: number;
  name?: string;
  cnpj?: string;
}

