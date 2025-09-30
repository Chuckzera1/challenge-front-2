import { Grid, Skeleton } from '@mantine/core';
import { SupplierCard } from '../atoms/SupplierCard';
import { SupplierListDto } from '@/types/supplier';

interface SupplierListProps {
  suppliers: SupplierListDto[];
  onEdit?: (supplier: SupplierListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
  isLoading?: boolean;
}

export function SupplierList({ suppliers, onEdit, onDelete, onUpdate, isLoading = false }: SupplierListProps) {
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
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum fornecedor encontrado</p>
        <p className="text-gray-400 text-sm mt-2">
          Tente ajustar os filtros ou adicionar um novo fornecedor
        </p>
      </div>
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
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
