import { Pagination, Group, Text } from '@mantine/core';
import { PagedResultDto } from '@/types/shared';

interface GenericPaginationProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pagination: PagedResultDto<any>;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  entityName?: string;
  showInfo?: boolean;
  variant?: 'simple' | 'detailed';
}

export function GenericPagination({ 
  pagination, 
  onPageChange, 
  isLoading = false,
  entityName = 'itens',
  showInfo = true,
  variant = 'detailed'
}: GenericPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  if (variant === 'simple') {
    return (
      <div className="flex justify-center mt-6">
        <Pagination
          total={pagination.totalPages}
          value={pagination.page}
          onChange={onPageChange}
          disabled={isLoading}
          size="sm"
          withEdges
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Group justify="space-between" align="center">
        {showInfo && (
          <Text size="sm" c="dimmed">
            Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
            {Math.min(pagination.page * pagination.limit, pagination.totalCount)} de{' '}
            {pagination.totalCount} {entityName}
          </Text>
        )}
        
        <Pagination
          total={pagination.totalPages}
          value={pagination.page}
          onChange={onPageChange}
          disabled={isLoading}
          size="sm"
          withEdges
        />
      </Group>
    </div>
  );
}
