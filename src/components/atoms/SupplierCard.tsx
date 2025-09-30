import { SupplierListDto } from '@/types/supplier';
import { IconUser, IconBuilding, IconMapPin, IconCalendar, IconEdit, IconTrash, IconMail } from '@tabler/icons-react';
import { PersonType } from '@/types/supplier';
import { GenericCard } from './GenericCard';

interface SupplierCardProps {
  supplier: SupplierListDto;
  onEdit?: (supplier: SupplierListDto) => void;
  onDelete?: (id: number) => void;
  onUpdate?: () => void;
}

export function SupplierCard({ supplier, onEdit, onDelete, onUpdate }: SupplierCardProps) {
  const isIndividual = supplier.cpf;
  const personType = isIndividual ? PersonType.Individual : PersonType.Company;
  
  const actions = [];
  
  if (onEdit) {
    actions.push({
      icon: <IconEdit className="h-4 w-4" />,
      label: 'Editar',
      onClick: () => onEdit(supplier),
      className: 'text-blue-600 hover:bg-blue-50'
    });
  }
  
  if (onDelete) {
    actions.push({
      icon: <IconTrash className="h-4 w-4" />,
      label: 'Excluir',
      onClick: () => onDelete(supplier.id),
      className: 'text-red-600 hover:bg-red-50'
    });
  }

  return (
    <GenericCard
      icon={isIndividual ? 
        <IconUser className="h-6 w-6" /> : 
        <IconBuilding className="h-6 w-6" />
      }
      iconBgColor={isIndividual ? 'bg-green-100' : 'bg-purple-100'}
      iconColor={isIndividual ? 'text-green-600' : 'text-purple-600'}
      title={supplier.name}
      subtitle={supplier.cpf ? `CPF: ${supplier.cpf}` : `CNPJ: ${supplier.cnpj}`}
      badge={{
        text: isIndividual ? 'Pessoa Física' : 'Pessoa Jurídica',
        color: isIndividual ? 'green' : 'purple'
      }}
      actions={actions}
      footerText={supplier.companySuppliers.length > 0 ? 
        `${supplier.companySuppliers.length} empresa(s) vinculada(s)` : 
        undefined
      }
    >
      <div className="flex items-center text-sm text-gray-600">
        <IconMail className="h-4 w-4 mr-2" />
        <span>{supplier.email}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        <IconMapPin className="h-4 w-4 mr-2" />
        <span>CEP: {supplier.zipCode}</span>
      </div>
      
      {supplier.rg && (
        <div className="text-sm text-gray-600">
          <span>RG: {supplier.rg}</span>
        </div>
      )}
      
      {supplier.birthDate && (
        <div className="flex items-center text-sm text-gray-600">
          <IconCalendar className="h-4 w-4 mr-2" />
          <span>Nascimento: {new Date(supplier.birthDate).toLocaleDateString('pt-BR')}</span>
        </div>
      )}
      
      <div className="flex items-center text-sm text-gray-600">
        <IconCalendar className="h-4 w-4 mr-2" />
        <span>Criado em: {new Date(supplier.createdAt).toLocaleDateString('pt-BR')}</span>
      </div>
    </GenericCard>
  );
}
