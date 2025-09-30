import { CompanyListDto } from '@/types/company';
import { CompanyCard } from '../atoms/CompanyCard';
import { Stack, Text, Loader, Center, Grid, Skeleton } from '@mantine/core';

interface CompanyListProps {
  companies: CompanyListDto[];
  onEdit?: (company: CompanyListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
  onViewRelationships?: (company: CompanyListDto) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function CompanyList({ 
  companies, 
  onEdit, 
  onDelete, 
  onUpdate,
  onViewRelationships,
  isLoading = false,
  emptyMessage = 'Nenhuma empresa encontrada'
}: CompanyListProps) {
  if (isLoading) {
    return (
        <Grid>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
            <Skeleton height={200} />
          </Grid.Col>
        ))}
      </Grid>
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
          onViewRelationships={onViewRelationships}
        />
      ))}
    </div>
  );
}
