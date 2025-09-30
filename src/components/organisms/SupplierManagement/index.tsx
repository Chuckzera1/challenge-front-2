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
import { SupplierList } from '../../molecules/SupplierList';
import { GenericPagination } from '../../molecules/GenericPagination';
import { SupplierFilters } from '../../atoms/SupplierFilters';
import { SupplierForm } from '../../atoms/SupplierForm';
import { RelationshipModal } from '../../atoms/RelationshipModal';
import { supplierService } from '@/services/supplierService';
import { 
  SupplierListDto, 
  CreateSupplierDto, 
  UpdateSupplierDto, 
  GetAllSupplierFilterDto,
  PagedResultDto 
} from '@/types/supplier';

export function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<SupplierListDto[]>([]);
  const [pagination, setPagination] = useState<PagedResultDto<SupplierListDto> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierListDto | null>(null);
  const [filters, setFilters] = useState<GetAllSupplierFilterDto>({});
  const [error, setError] = useState<string | null>(null);
  const [isRelationshipModalOpen, setIsRelationshipModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierListDto | null>(null);

  const loadSuppliers = async (page = 1, newFilters: GetAllSupplierFilterDto = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await supplierService.getAll({
        ...newFilters,
        page,
        limit: 9,
      });
      
      setSuppliers(result.data);
      setPagination(result);
    } catch (err) {
      setError('Erro ao carregar fornecedores. Tente novamente.');
      console.error('Error loading suppliers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleCreate = async (data: CreateSupplierDto | UpdateSupplierDto) => {
    try {
      setIsLoading(true);
      if ('type' in data) {
        await supplierService.create(data as CreateSupplierDto);
      }
      setIsModalOpen(false);
      await loadSuppliers(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao criar fornecedor. Tente novamente.');
      console.error('Error creating supplier:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: CreateSupplierDto | UpdateSupplierDto) => {
    if (!editingSupplier) return;
    
    try {
      setIsLoading(true);
      if (!('type' in data)) {
        await supplierService.update(editingSupplier.id, data as UpdateSupplierDto);
      }
      setIsModalOpen(false);
      setEditingSupplier(null);
      await loadSuppliers(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao atualizar fornecedor. Tente novamente.');
      console.error('Error updating supplier:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;
    
    try {
      setIsLoading(true);
      await supplierService.delete(id);
      await loadSuppliers(pagination?.page || 1, filters);
    } catch (err) {
      setError('Erro ao excluir fornecedor. Tente novamente.');
      console.error('Error deleting supplier:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (supplier: SupplierListDto) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleFilter = (newFilters: GetAllSupplierFilterDto) => {
    setFilters(newFilters);
    loadSuppliers(1, newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    loadSuppliers(1, {});
  };

  const handlePageChange = (page: number) => {
    loadSuppliers(page, filters);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleViewRelationships = (supplier: SupplierListDto) => {
    setSelectedSupplier(supplier);
    setIsRelationshipModalOpen(true);
  };

  const handleRelationshipModalClose = () => {
    setIsRelationshipModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleRelationshipUpdate = () => {
    loadSuppliers(pagination?.page || 1, filters);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Title order={2}>Fornecedores</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
        >
          Novo Fornecedor
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

      <SupplierFilters
        onFilter={handleFilter}
        onClear={handleClearFilters}
        isLoading={isLoading}
      />

      <SupplierList
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={() => loadSuppliers(pagination?.page || 1, filters)}
        onViewRelationships={handleViewRelationships}
        isLoading={isLoading}
      />

      {pagination && (
        <GenericPagination
          pagination={pagination}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          entityName="fornecedores"
        />
      )}

      <Modal
        opened={isModalOpen}
        onClose={handleModalClose}
        title={editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
        size="md"
      >
        <SupplierForm
          initialData={editingSupplier ? { 
            name: editingSupplier.name, 
            email: editingSupplier.email,
            zipCode: editingSupplier.zipCode,
            birthDate: editingSupplier.birthDate
          } : undefined}
          onSubmit={editingSupplier ? handleUpdate : handleCreate}
          onCancel={handleModalClose}
          isEditing={!!editingSupplier}
          isLoading={isLoading}
        />
      </Modal>

      {selectedSupplier && (
        <RelationshipModal
          opened={isRelationshipModalOpen}
          onClose={handleRelationshipModalClose}
          entity={selectedSupplier}
          entityType="supplier"
          onUpdate={handleRelationshipUpdate}
        />
      )}
    </Stack>
  );
}
