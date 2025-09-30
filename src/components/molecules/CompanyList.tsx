import { CompanyListDto } from '@/types/company';
import { CompanyCard } from '../atoms/CompanyCard';
import { Stack, Text, Loader, Center } from '@mantine/core';

interface CompanyListProps {
  companies: CompanyListDto[];
  onEdit?: (company: CompanyListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function CompanyList({ 
  companies, 
  onEdit, 
  onDelete, 
  onUpdate,
  isLoading = false,
  emptyMessage = 'Nenhuma empresa encontrada'
}: CompanyListProps) {
  if (isLoading) {
    return (
      <Center py="xl">
        <Loader size="lg" />
      </Center>
    );
  }

  if (companies.length === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Text c="dimmed" size="lg">
            {emptyMessage}
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
