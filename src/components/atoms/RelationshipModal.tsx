import { useState } from 'react';
import { Modal, Button, Text, Stack, Group, ScrollArea, ActionIcon, Badge, Loader, Center } from '@mantine/core';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { CompanyListDto, CompanySupplierListDto } from '@/types/company';
import { SupplierListDto, SupplierCompanyListDto } from '@/types/supplier';
import { relationshipService } from '@/services';
import { notifications } from '@mantine/notifications';
import { EntitySearchFilter } from './EntitySearchFilter';

interface RelationshipModalProps {
  opened: boolean;
  onClose: () => void;
  entity: CompanyListDto | SupplierListDto;
  entityType: 'company' | 'supplier';
  onUpdate: () => void;
}

export function RelationshipModal({ 
  opened, 
  onClose, 
  entity, 
  entityType, 
  onUpdate 
}: RelationshipModalProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [availableEntities, setAvailableEntities] = useState<(CompanyListDto | SupplierListDto)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const relationships = entityType === 'company' 
    ? (entity as CompanyListDto).companySuppliers 
    : (entity as SupplierListDto).companySuppliers;

  const handleAddRelationship = async () => {
    setIsLoading(true);
    try {
      // Fetch available entities based on type
      if (entityType === 'company') {
        // Get all suppliers and filter out already linked ones
        const { supplierService } = await import('@/services');
        const response = await supplierService.getAll({ limit: 1000 });
        const linkedSupplierIds = relationships.map(rel => 
          (rel as CompanySupplierListDto).supplierId
        );
        const availableSuppliers = response.data.filter(supplier => 
          !linkedSupplierIds.includes(supplier.id)
        );
        setAvailableEntities(availableSuppliers);
      } else {
        // Get all companies and filter out already linked ones
        const { companyService } = await import('@/services');
        const response = await companyService.getAll({ limit: 1000 });
        const linkedCompanyIds = relationships.map(rel => 
          (rel as SupplierCompanyListDto).companyId
        );
        const availableCompanies = response.data.filter(company => 
          !linkedCompanyIds.includes(company.id)
        );
        setAvailableEntities(availableCompanies);
      }
      setShowAddModal(true);
    } catch (error) {
      console.error('Error loading available entities:', error);
      notifications.show({
        title: 'Erro',
        message: 'Erro ao carregar entidades disponíveis',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRelationship = async (targetEntityId: number) => {
    try {
      if (entityType === 'company') {
        await relationshipService.create({
          companyId: entity.id,
          supplierId: targetEntityId,
        });
      } else {
        await relationshipService.create({
          companyId: targetEntityId,
          supplierId: entity.id,
        });
      }
      
      notifications.show({
        title: 'Sucesso',
        message: 'Relacionamento criado com sucesso',
        color: 'green',
      });
      
      setShowAddModal(false);
      onUpdate();
    } catch (error) {
      console.error('Error creating relationship:', error);
      notifications.show({
        title: 'Erro',
        message: 'Erro ao criar relacionamento',
        color: 'red',
      });
    }
  };

  const handleDeleteRelationship = async (relationshipId: number, targetEntityId: number) => {
    setIsDeleting(relationshipId);
    try {
      if (entityType === 'company') {
        await relationshipService.delete(entity.id, targetEntityId);
      } else {
        await relationshipService.delete(targetEntityId, entity.id);
      }
      
      notifications.show({
        title: 'Sucesso',
        message: 'Relacionamento removido com sucesso',
        color: 'green',
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error deleting relationship:', error);
      notifications.show({
        title: 'Erro',
        message: 'Erro ao remover relacionamento',
        color: 'red',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredEntities = availableEntities.filter(entity => {
    const matchesSearch = entityType === 'company' 
      ? (entity as SupplierListDto).name.toLowerCase().includes(searchTerm.toLowerCase())
      : (entity as CompanyListDto).fantasyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterType || (
      entityType === 'company' 
        ? (entity as SupplierListDto).cpf ? filterType === 'individual' : filterType === 'company'
        : true // For companies, we could add more filters if needed
    );
    
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={`Relacionamentos - ${entityType === 'company' ? 'Empresa' : 'Fornecedor'}`}
        size="lg"
      >
        <Stack gap="md">
          {/* Entity Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Text size="lg" fw={600}>
              {entityType === 'company' 
                ? (entity as CompanyListDto).fantasyName 
                : (entity as SupplierListDto).name
              }
            </Text>
            <Text size="sm" c="dimmed">
              {entityType === 'company' 
                ? `CNPJ: ${(entity as CompanyListDto).cnpj}`
                : `Email: ${(entity as SupplierListDto).email}`
              }
            </Text>
          </div>

          {/* Actions */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {relationships.length} relacionamento(s) encontrado(s)
            </Text>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddRelationship}
              loading={isLoading}
            >
              Adicionar Relacionamento
            </Button>
          </Group>

          {/* Relationships List */}
          <ScrollArea.Autosize mah={300}>
            {relationships.length === 0 ? (
              <Center py="xl">
                <Text c="dimmed">Nenhum relacionamento encontrado</Text>
              </Center>
            ) : (
              <Stack gap="sm">
                {relationships.map((relationship) => {
                  const targetEntity = entityType === 'company' 
                    ? (relationship as CompanySupplierListDto).supplier
                    : (relationship as SupplierCompanyListDto).company;
                  
                  return (
                    <div key={relationship.id} className="p-3 border rounded-lg">
                      <Group justify="space-between">
                        <div className="flex-1">
                          <Text fw={500}>
                            {entityType === 'company' 
                              ? (targetEntity as any).name
                              : (targetEntity as any).fantasyName
                            }
                          </Text>
                          <Text size="sm" c="dimmed">
                            {entityType === 'company' 
                              ? `Email: ${(targetEntity as any).email}`
                              : `CNPJ: ${(targetEntity as any).cnpj}`
                            }
                          </Text>
                        </div>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => handleDeleteRelationship(
                            relationship.id, 
                            entityType === 'company' 
                              ? (relationship as CompanySupplierListDto).supplierId
                              : (relationship as SupplierCompanyListDto).companyId
                          )}
                          loading={isDeleting === relationship.id}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </div>
                  );
                })}
              </Stack>
            )}
          </ScrollArea.Autosize>
        </Stack>
      </Modal>

      {/* Add Relationship Modal */}
      <Modal
        opened={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSearchTerm('');
          setFilterType('');
        }}
        title={`Adicionar ${entityType === 'company' ? 'Fornecedor' : 'Empresa'}`}
        size="md"
      >
        <Stack gap="md">
          <EntitySearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterTypeChange={(value) => setFilterType(value || '')}
            entityType={entityType}
          />
          
          <ScrollArea.Autosize mah={300}>
            {isLoading ? (
              <Center py="xl">
                <Loader />
              </Center>
            ) : filteredEntities.length === 0 ? (
              <Center py="xl">
                <Text c="dimmed">
                  {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhuma entidade disponível'}
                </Text>
              </Center>
            ) : (
              <Stack gap="sm">
                {filteredEntities.map((entity) => (
                  <div key={entity.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Group justify="space-between">
                      <div>
                        <Text fw={500}>
                          {entityType === 'company' 
                            ? (entity as SupplierListDto).name
                            : (entity as CompanyListDto).fantasyName
                          }
                        </Text>
                        <Text size="sm" c="dimmed">
                          {entityType === 'company' 
                            ? `Email: ${(entity as SupplierListDto).email}`
                            : `CNPJ: ${(entity as CompanyListDto).cnpj}`
                          }
                        </Text>
                      </div>
                      <Button
                        size="xs"
                        onClick={() => handleCreateRelationship(entity.id)}
                      >
                        Adicionar
                      </Button>
                    </Group>
                  </div>
                ))}
              </Stack>
            )}
          </ScrollArea.Autosize>
        </Stack>
      </Modal>
    </>
  );
}
