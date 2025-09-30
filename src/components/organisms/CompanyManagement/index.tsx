import { useState, useEffect } from 'react';
import { 
  Stack, 
  Button, 
  Group, 
  Title, 
  Modal, 
  Alert,
  Text
} from '@mantine/core';
import { IconPlus, IconAlertCircle } from '@tabler/icons-react';
import { CompanyList } from '../../molecules/CompanyList';
import { GenericPagination } from '../../molecules/GenericPagination';
import { CompanyFilters } from '../../atoms/CompanyFilters';
import { CompanyForm } from '../../atoms/CompanyForm';
import { RelationshipModal } from '../../atoms/RelationshipModal';
import { companyService } from '@/services';
import { 
  CompanyListDto, 
  CreateCompanyDto, 
  UpdateCompanyDto, 
  GetAllCompanyFilterDto
} from '@/types/company';
import { PagedResultDto } from '@/types/shared';

export function CompanyManagement() {
  const [companies, setCompanies] = useState<CompanyListDto[]>([]);
  const [pagination, setPagination] = useState<PagedResultDto<CompanyListDto> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyListDto | null>(null);
  const [filters, setFilters] = useState<GetAllCompanyFilterDto>({});
  const [error, setError] = useState<string | null>(null);
  const [isRelationshipModalOpen, setIsRelationshipModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyListDto | null>(null);

  const loadCompanies = async (page = 1, newFilters: GetAllCompanyFilterDto = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await companyService.getAll({
        ...newFilters,
        page,
        limit: 9,
      });
      
      setCompanies(result.data);
      setPagination(result);
    } catch (err) {
      setError('Erro ao carregar empresas. Tente novamente.');
      console.error('Error loading companies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleCreate = async (data: CreateCompanyDto | UpdateCompanyDto) => {
    try {
      setIsLoading(true);
      if ('cnpj' in data) {
        await companyService.create(data as CreateCompanyDto);
      }
      setIsModalOpen(false);
      await loadCompanies(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao criar empresa. Tente novamente.');
      console.error('Error creating company:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: CreateCompanyDto | UpdateCompanyDto) => {
    if (!editingCompany) return;
    
    try {
      setIsLoading(true);
      if (!('cnpj' in data)) {
        await companyService.update(editingCompany.id, data as UpdateCompanyDto);
      }
      setIsModalOpen(false);
      setEditingCompany(null);
      await loadCompanies(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao atualizar empresa. Tente novamente.');
      console.error('Error updating company:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return;
    
    try {
      setIsLoading(true);
      await companyService.delete(id);
      await loadCompanies(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao excluir empresa. Tente novamente.');
      console.error('Error deleting company:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (company: CompanyListDto) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleFilter = (newFilters: GetAllCompanyFilterDto) => {
    setFilters(newFilters);
    loadCompanies(1, newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    loadCompanies(1, {});
  };

  const handlePageChange = (page: number) => {
    loadCompanies(page, filters);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleViewRelationships = (company: CompanyListDto) => {
    setSelectedCompany(company);
    setIsRelationshipModalOpen(true);
  };

  const handleRelationshipModalClose = () => {
    setIsRelationshipModalOpen(false);
    setSelectedCompany(null);
  };

  const handleRelationshipUpdate = () => {
    loadCompanies(pagination?.page || 1, filters);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Title order={2}>Empresas</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
        >
          Nova Empresa
        </Button>
      </Group>

      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Erro"
          color="red"
          onClose={() => setError(null)}
          withCloseButton
        >
          {error}
        </Alert>
      )}

      <CompanyFilters
        onFilter={handleFilter}
        onClear={handleClearFilters}
        isLoading={isLoading}
      />

      <CompanyList
        companies={companies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={() => loadCompanies(pagination?.page || 1, filters)}
        onViewRelationships={handleViewRelationships}
        isLoading={isLoading}
      />

      {pagination && (
        <GenericPagination
          pagination={pagination}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          entityName="empresas"
        />
      )}

      <Modal
        opened={isModalOpen}
        onClose={handleModalClose}
        title={editingCompany ? 'Editar Empresa' : 'Nova Empresa'}
        size="md"
      >
        <CompanyForm
          initialData={editingCompany ? { fantasyName: editingCompany.fantasyName } : undefined}
          onSubmit={editingCompany ? handleUpdate : handleCreate}
          onCancel={handleModalClose}
          isEditing={!!editingCompany}
          isLoading={isLoading}
        />
      </Modal>

      {selectedCompany && (
        <RelationshipModal
          opened={isRelationshipModalOpen}
          onClose={handleRelationshipModalClose}
          entity={selectedCompany}
          entityType="company"
          onUpdate={handleRelationshipUpdate}
        />
      )}
    </Stack>
  );
}
