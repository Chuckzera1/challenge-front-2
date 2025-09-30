import { CompanyListDto, CompanySupplierListDto } from '@/types/company';
import { SupplierListDto, SupplierCompanyListDto } from '@/types/supplier';
import { relationshipService } from '@/services';

export const entityConfig = {
  company: {
    displayName: 'Empresa',
    targetDisplayName: 'Fornecedor',
    
    getRelationships: (entity: CompanyListDto) => entity.companySuppliers,
    getEntityName: (entity: CompanyListDto) => entity.fantasyName,
    getEntityInfo: (entity: CompanyListDto) => `CNPJ: ${entity.cnpj}`,
    
    getTargetEntityFromRelationship: (rel: CompanySupplierListDto) => rel.supplier,
    getTargetEntityId: (rel: CompanySupplierListDto) => rel.supplierId,
    getTargetEntityName: (targetEntity: any) => targetEntity.name,
    getTargetEntityInfo: (targetEntity: any) => `Email: ${targetEntity.email}`,
    
    getSearchableName: (entity: SupplierListDto) => entity.name,
    getSearchableInfo: (entity: SupplierListDto) => `Email: ${entity.email}`,
    matchesFilter: (entity: SupplierListDto, filterType: string) => 
      !filterType || (entity.cpf ? filterType === 'individual' : filterType === 'company'),
    
    createOptimisticRelationship: (entity: CompanyListDto, targetEntity: SupplierListDto) => ({
      id: Date.now(),
      companyId: entity.id,
      supplierId: targetEntity.id,
      supplier: {
        id: targetEntity.id,
        name: targetEntity.name,
        email: targetEntity.email,
        zipCode: targetEntity.zipCode,
        cpf: targetEntity.cpf,
        cnpj: targetEntity.cnpj,
        rg: targetEntity.rg,
        birthDate: targetEntity.birthDate,
        createdAt: targetEntity.createdAt,
        updatedAt: targetEntity.updatedAt,
      }
    } as CompanySupplierListDto),
    
    createRelationship: (entityId: number, targetEntityId: number) => 
      relationshipService.create({ companyId: entityId, supplierId: targetEntityId }),
    deleteRelationship: (entityId: number, targetEntityId: number) => 
      relationshipService.delete(entityId, targetEntityId),
    
    fetchAvailableEntities: async () => {
      const { supplierService } = await import('@/services');
      return await supplierService.getAll({ limit: 1000 });
    },
    
    convertToAvailableEntity: (targetEntity: any) => ({
      id: targetEntity.id,
      name: targetEntity.name,
      email: targetEntity.email,
      zipCode: targetEntity.zipCode,
      cpf: targetEntity.cpf,
      cnpj: targetEntity.cnpj,
      rg: targetEntity.rg,
      birthDate: targetEntity.birthDate,
      createdAt: targetEntity.createdAt,
      updatedAt: targetEntity.updatedAt,
      companySuppliers: []
    } as SupplierListDto)
  },
  
  supplier: {
    displayName: 'Fornecedor',
    targetDisplayName: 'Empresa',
    
    getRelationships: (entity: SupplierListDto) => entity.companySuppliers,
    getEntityName: (entity: SupplierListDto) => entity.name,
    getEntityInfo: (entity: SupplierListDto) => `Email: ${entity.email}`,
    
    getTargetEntityFromRelationship: (rel: SupplierCompanyListDto) => rel.company,
    getTargetEntityId: (rel: SupplierCompanyListDto) => rel.companyId,
    getTargetEntityName: (targetEntity: any) => targetEntity.fantasyName,
    getTargetEntityInfo: (targetEntity: any) => `CNPJ: ${targetEntity.cnpj}`,
    
    getSearchableName: (entity: CompanyListDto) => entity.fantasyName,
    getSearchableInfo: (entity: CompanyListDto) => `CNPJ: ${entity.cnpj}`,
    matchesFilter: (entity: CompanyListDto, filterType: string) => true,
    
    createOptimisticRelationship: (entity: SupplierListDto, targetEntity: CompanyListDto) => ({
      id: Date.now(),
      companyId: targetEntity.id,
      supplierId: entity.id,
      company: {
        id: targetEntity.id,
        cnpj: targetEntity.cnpj,
        fantasyName: targetEntity.fantasyName,
        zipCode: targetEntity.zipCode,
        state: targetEntity.state,
        createdAt: targetEntity.createdAt,
        updatedAt: targetEntity.updatedAt,
      }
    } as SupplierCompanyListDto),
    
    createRelationship: (entityId: number, targetEntityId: number) => 
      relationshipService.create({ companyId: targetEntityId, supplierId: entityId }),
    deleteRelationship: (entityId: number, targetEntityId: number) => 
      relationshipService.delete(targetEntityId, entityId),
    
    fetchAvailableEntities: async () => {
      const { companyService } = await import('@/services');
      return await companyService.getAll({ limit: 1000 });
    },
    
    convertToAvailableEntity: (targetEntity: any) => ({
      id: targetEntity.id,
      cnpj: targetEntity.cnpj,
      fantasyName: targetEntity.fantasyName,
      zipCode: targetEntity.zipCode,
      state: targetEntity.state,
      createdAt: targetEntity.createdAt,
      updatedAt: targetEntity.updatedAt,
      companySuppliers: []
    } as CompanyListDto)
  }
} as const;

export type EntityType = keyof typeof entityConfig;
