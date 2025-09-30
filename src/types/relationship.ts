// Relationship DTOs
export interface AddCompanySupplierDto {
  companyId: number;
  supplierId: number;
}

export interface CompanySupplierListDto {
  id: number;
  companyId: number;
  supplierId: number;
  companyName: string;
  companyCnpj: string;
  supplierName: string;
  supplierEmail: string;
  supplierType: string;
  supplierCpf: string;
  supplierCnpj: string;
}

export interface CompanySupplierResponseDto {
  id: number;
  companyId: number;
  supplierId: number;
  companyName: string;
  companyCnpj: string;
  supplierName: string;
  supplierEmail: string;
  supplierType: string;
  supplierCpf: string;
  supplierCnpj: string;
}

// Filter DTOs
export interface GetAllCompanySupplierFilterDto {
  page?: number;
  limit?: number;
  companyId?: number;
  supplierId?: number;
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
