import { Center, Grid, Skeleton, Stack, Text } from '@mantine/core';
import { SupplierCard } from '../atoms/SupplierCard';
import { SupplierListDto } from '@/types/supplier';
  
interface SupplierListProps {
  suppliers: SupplierListDto[];
  onEdit?: (supplier: SupplierListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
  onViewRelationships?: (supplier: SupplierListDto) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function SupplierList({ suppliers, onEdit, onDelete, onUpdate, onViewRelationships, isLoading = false, emptyMessage = 'Nenhum fornecedor encontrado' }: SupplierListProps) {
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

  if (suppliers.length === 0) {
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
    <Grid>
      {suppliers.map((supplier) => (
        <Grid.Col key={supplier.id} span={{ base: 12, sm: 6, lg: 4 }}>
          <SupplierCard
            supplier={supplier}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onViewRelationships={onViewRelationships}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
