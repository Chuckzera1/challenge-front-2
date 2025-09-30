import { useState } from 'react';
import { TextInput, Button, Group, Stack } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { GetAllSupplierFilterDto } from '@/types/supplier';

interface SupplierFiltersProps {
  onFilter: (filters: GetAllSupplierFilterDto) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function SupplierFilters({ onFilter, onClear, isLoading = false }: SupplierFiltersProps) {
  const [filters, setFilters] = useState<GetAllSupplierFilterDto>({
    name: '',
    cpf: '',
    cnpj: '',
  });

  const handleFilter = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value && value.trim() !== '')
    );
    onFilter(cleanFilters);
  };

  const handleClear = () => {
    setFilters({ name: '', cpf: '', cnpj: '' });
    onClear();
  };

  const handleInputChange = (field: keyof GetAllSupplierFilterDto, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Stack gap="md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput
            label="Nome do Fornecedor"
            placeholder="Digite o nome do fornecedor"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            leftSection={<IconSearch size={16} />}
          />
          
          <TextInput
            label="CPF"
            placeholder="Digite o CPF"
            value={filters.cpf || ''}
            onChange={(e) => handleInputChange('cpf', e.target.value)}
            leftSection={<IconSearch size={16} />}
          />
          
          <TextInput
            label="CNPJ"
            placeholder="Digite o CNPJ"
            value={filters.cnpj || ''}
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            leftSection={<IconSearch size={16} />}
          />
        </div>
        
        <Group justify="flex-end">
          <Button
            variant="outline"
            leftSection={<IconX size={16} />}
            onClick={handleClear}
            disabled={isLoading}
          >
            Limpar
          </Button>
          <Button
            leftSection={<IconSearch size={16} />}
            onClick={handleFilter}
            loading={isLoading}
          >
            Filtrar
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
