import { TextInput, Select, Group } from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';

interface EntitySearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType?: string;
  onFilterTypeChange?: (value: string | null) => void;
  entityType: 'company' | 'supplier';
}

export function EntitySearchFilter({ 
  searchTerm, 
  onSearchChange, 
  filterType, 
  onFilterTypeChange,
  entityType 
}: EntitySearchFilterProps) {
  const filterOptions = entityType === 'company' 
    ? [
        { value: '', label: 'Todos os fornecedores' },
        { value: 'individual', label: 'Pessoa Física' },
        { value: 'company', label: 'Pessoa Jurídica' }
      ]
    : [
        { value: '', label: 'Todas as empresas' },
        { value: 'active', label: 'Empresas ativas' }
      ];

  return (
    <Group gap="md" align="end">
      <TextInput
        placeholder={`Buscar ${entityType === 'company' ? 'fornecedor' : 'empresa'}...`}
        leftSection={<IconSearch size={16} />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1 }}
      />
      
      {onFilterTypeChange && (
        <Select
          placeholder="Filtrar por tipo"
          leftSection={<IconFilter size={16} />}
          data={filterOptions}
          value={filterType || ''}
          onChange={onFilterTypeChange}
          clearable
          style={{ minWidth: 200 }}
        />
      )}
    </Group>
  );
}
