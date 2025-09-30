import { CompanyListDto } from '@/types/company';
import { IconBuilding, IconMapPin, IconCalendar, IconEdit, IconTrash, IconLink } from '@tabler/icons-react';
import { GenericCard } from './GenericCard';

interface CompanyCardProps {
  company: CompanyListDto;
  onEdit?: (company: CompanyListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
  onViewRelationships?: (company: CompanyListDto) => void;
}

export function CompanyCard({ company, onEdit, onDelete, onViewRelationships }: CompanyCardProps) {
  const actions = [];
  
  if (onViewRelationships) {
    actions.push({
      icon: <IconLink className="h-4 w-4" />,
      label: 'Relacionamentos',
      onClick: () => onViewRelationships(company),
      className: 'text-green-600 hover:bg-green-50'
    });
  }
  
  if (onEdit) {
    actions.push({
      icon: <IconEdit className="h-4 w-4" />,
      label: 'Editar',
      onClick: () => onEdit(company),
      className: 'text-blue-600 hover:bg-blue-50'
    });
  }
  
  if (onDelete) {
    actions.push({
      icon: <IconTrash className="h-4 w-4" />,
      label: 'Excluir',
      onClick: () => onDelete(company.id),
      className: 'text-red-600 hover:bg-red-50'
    });
  }

  return (
    <GenericCard
      icon={<IconBuilding className="h-6 w-6" />}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      title={company.fantasyName}
      subtitle={`CNPJ: ${company.cnpj}`}
      actions={actions}
      footerText={company.companySuppliers.length > 0 ? 
        `${company.companySuppliers.length} fornecedor(es) vinculado(s)` : 
        undefined
      }
    >
      <div className="flex items-center text-sm text-gray-600">
        <IconMapPin className="h-4 w-4 mr-2" />
        <span>CEP: {company.zipCode}</span>
        {company.state && <span className="ml-2">• {company.state}</span>}
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        <IconCalendar className="h-4 w-4 mr-2" />
        <span>Criado em: {new Date(company.createdAt).toLocaleDateString('pt-BR')}</span>
      </div>
    </GenericCard>
  );
}
