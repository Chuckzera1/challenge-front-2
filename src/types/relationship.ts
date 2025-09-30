import { PaginationDto, PagedResultDto } from './shared';

export interface AddCompanySupplierDto {
  companyId: number;
  supplierId: number;
}

export interface CompanySupplierFlatListDto {
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


export interface GetAllCompanySupplierFilterDto {
  page?: number;
  limit?: number;
  companyId?: number;
  supplierId?: number;
}

