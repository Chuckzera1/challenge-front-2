import { PaginationDto, PagedResultDto } from './shared';

export enum PersonType {
  Individual = 1,
  Company = 2
}

export interface CreateSupplierDto {
  name: string;
  email: string;
  zipCode: string;
  type: PersonType;
  cpf?: string;
  cnpj?: string;
  rg?: string;
  birthDate?: string;
}

export interface UpdateSupplierDto {
  name: string;
  email: string;
  zipCode: string;
  birthDate?: string;
}

export interface SupplierListDto {
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
  companySuppliers: SupplierCompanyListDto[];
}

export interface SupplierCompanyListDto {
  id: number;
  companyId: number;
  supplierId: number;
  company: CompanyBasicDto;
}

export interface CompanyBasicDto {
  id: number;
  cnpj: string;
  fantasyName: string;
  zipCode: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllSupplierFilterDto {
  page?: number;
  limit?: number;
  name?: string;
  cpf?: string;
  cnpj?: string;
}

