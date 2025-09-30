import { useState } from 'react';
import { TextInput, Button, Group, Stack } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { GetAllCompanyFilterDto } from '@/types/company';

interface CompanyFiltersProps {
  onFilter: (filters: GetAllCompanyFilterDto) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function CompanyFilters({ onFilter, onClear, isLoading = false }: CompanyFiltersProps) {
  const [filters, setFilters] = useState<GetAllCompanyFilterDto>({
    name: '',
    cnpj: '',
  });

  const handleFilter = () => {
    const cleanFilters = Object.fromEntries(
      /* eslint-disable @typescript-eslint/no-unused-vars */
      Object.entries(filters).filter(([_, value]) => value && value.trim() !== '')
    );
    onFilter(cleanFilters);
  };

  const handleClear = () => {
    setFilters({ name: '', cnpj: '' });
    onClear();
  };

  const handleInputChange = (field: keyof GetAllCompanyFilterDto, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Stack gap="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Nome da Empresa"
            placeholder="Digite o nome da empresa"
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
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
