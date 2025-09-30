// Enums
export enum PersonType {
  Individual = 1,
  Company = 2
}

// Base DTOs
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

export interface SupplierResponseDto {
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
  companySuppliers: SupplierCompanyResponseDto[];
}

export interface SupplierCompanyListDto {
  id: number;
  companyId: number;
  supplierId: number;
  company: CompanyBasicDto;
}

export interface SupplierCompanyResponseDto {
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

// Filter DTOs
export interface GetAllSupplierFilterDto {
  page?: number;
  limit?: number;
  name?: string;
  cpf?: string;
  cnpj?: string;
}

// Pagination DTOs (reusing from company.ts)
export interface PaginationDto {
  page: number;
  limit: number;
  skip: number;
}

export interface PagedResultDto<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
