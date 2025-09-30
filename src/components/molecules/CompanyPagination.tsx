import { Pagination, Group, Text } from '@mantine/core';
import { PagedResultDto } from '@/types/company';

interface CompanyPaginationProps {
  pagination: PagedResultDto<any>;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function CompanyPagination({ 
  pagination, 
  onPageChange, 
  isLoading = false 
}: CompanyPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Group justify="space-between" align="center">
        <Text size="sm" c="dimmed">
          Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
          {Math.min(pagination.page * pagination.limit, pagination.totalCount)} de{' '}
          {pagination.totalCount} empresas
        </Text>
        
        <Pagination
          total={pagination.totalPages}
          value={pagination.page}
          onChange={onPageChange}
          disabled={isLoading}
          size="sm"
        />
      </Group>
    </div>
  );
}
