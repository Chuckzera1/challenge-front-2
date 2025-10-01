/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Modal, Button, Text, Stack, Group, ScrollArea, ActionIcon, Loader, Center } from '@mantine/core';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { CompanyListDto, CompanySupplierListDto } from '@/types/company';
import { SupplierListDto, SupplierCompanyListDto } from '@/types/supplier';
import { notifications } from '@mantine/notifications';
import { EntitySearchFilter } from './EntitySearchFilter';
import { entityConfig } from './relationshipModalConfig';

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
  
  const [localRelationships, setLocalRelationships] = useState<(CompanySupplierListDto | SupplierCompanyListDto)[]>([]);
  
  const config = entityConfig[entityType];
  
  useEffect(() => {
    if (opened && entity) {
      const relationships = config.getRelationships(entity as any);
      setLocalRelationships(relationships);
    }
  }, [opened, entity, entityType, config]);

  const relationships = localRelationships;

  const handleAddRelationship = async () => {
    setIsLoading(true);
    try {
      const response = await config.fetchAvailableEntities();
      
      const linkedIds = relationships.map(rel => config.getTargetEntityId(rel as any));
      const availableEntities = response.data.filter(entity => 
        !linkedIds.includes(entity.id)
      );
      
      setAvailableEntities(availableEntities);
      setShowAddModal(true);
    } catch (error) {
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
     const targetEntity = availableEntities.find(e => e.id === targetEntityId);
    if (!targetEntity) return;

    const optimisticRelationship = config.createOptimisticRelationship(entity as any, targetEntity as any);

    setLocalRelationships(prev => [...prev, optimisticRelationship]);
    setAvailableEntities(prev => prev.filter(e => e.id !== targetEntityId));
    setShowAddModal(false);

    try {
      await config.createRelationship(entity.id, targetEntityId);
      
      notifications.show({
        title: 'Sucesso',
        message: 'Relacionamento criado com sucesso',
        color: 'green',
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error creating relationship:', error);
      
      setLocalRelationships(prev => prev.filter(rel => rel.id !== optimisticRelationship.id));
      setAvailableEntities(prev => [...prev, targetEntity]);
      
      notifications.show({
        title: 'Erro',
        message: 'Erro ao criar relacionamento',
        color: 'red',
      });
    }
  };

  const handleDeleteRelationship = async (relationshipId: number, targetEntityId: number) => {
    setIsDeleting(relationshipId);
    
    const relationshipToDelete = localRelationships.find(rel => rel.id === relationshipId);
    if (!relationshipToDelete) return;

    const targetEntity = config.getTargetEntityFromRelationship(relationshipToDelete as any);

    setLocalRelationships(prev => prev.filter(rel => rel.id !== relationshipId));
    
    const entityToAdd = config.convertToAvailableEntity(targetEntity);
    setAvailableEntities(prev => [...prev, entityToAdd]);

    try {
      await config.deleteRelationship(entity.id, targetEntityId);
      
      notifications.show({
        title: 'Sucesso',
        message: 'Relacionamento removido com sucesso',
        color: 'green',
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error deleting relationship:', error);
      
      setLocalRelationships(prev => [...prev, relationshipToDelete]);
      setAvailableEntities(prev => prev.filter(e => e.id !== targetEntityId));
      
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
    const matchesSearch = config.getSearchableName(entity as any).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = config.matchesFilter(entity as any, filterType);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          onClose();
          setLocalRelationships([]);
        }}
        title={`Relacionamentos - ${config.displayName}`}
        size="lg"
      >
        <Stack gap="md">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Text size="lg" fw={600}>
              {config.getEntityName(entity as any)}
            </Text>
            <Text size="sm" c="dimmed">
              {config.getEntityInfo(entity as any)}
            </Text>
          </div>

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

          <ScrollArea.Autosize mah={300}>
            {relationships.length === 0 ? (
              <Center py="xl">
                <Text c="dimmed">Nenhum relacionamento encontrado</Text>
              </Center>
            ) : (
              <Stack gap="sm">
                {relationships.map((relationship) => {
                  const targetEntity = config.getTargetEntityFromRelationship(relationship as any);
                  
                  return (
                    <div key={relationship.id} className="p-3 border rounded-lg">
                      <Group justify="space-between">
                        <div className="flex-1">
                          <Text fw={500}>
                            {config.getTargetEntityName(targetEntity)}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {config.getTargetEntityInfo(targetEntity)}
                          </Text>
                        </div>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => handleDeleteRelationship(
                            relationship.id, 
                            config.getTargetEntityId(relationship as any)
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

      <Modal
        opened={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSearchTerm('');
          setFilterType('');
        }}
        title={`Adicionar ${config.targetDisplayName}`}
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
                          {config.getSearchableName(entity as any)}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {config.getSearchableInfo(entity as any)}
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
