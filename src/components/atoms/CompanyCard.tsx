import { CompanyListDto } from '@/types/company';
import { IconBuilding, IconMapPin, IconCalendar, IconEdit, IconTrash } from '@tabler/icons-react';

interface CompanyCardProps {
  company: CompanyListDto;
  onEdit?: (company: CompanyListDto) => void;
  onDelete?: (id: number) => void;
}

export function CompanyCard({ company, onEdit, onDelete }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <IconBuilding className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{company.fantasyName}</h3>
            <p className="text-sm text-gray-500">CNPJ: {company.cnpj}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(company)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <IconEdit className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(company.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir"
            >
              <IconTrash className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <IconMapPin className="h-4 w-4 mr-2" />
          <span>CEP: {company.zipCode}</span>
          {company.state && <span className="ml-2">• {company.state}</span>}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <IconCalendar className="h-4 w-4 mr-2" />
          <span>Criado em: {new Date(company.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        
        {company.companySuppliers.length > 0 && (
          <div className="mt-3">
            <span className="text-sm text-gray-500">
              {company.companySuppliers.length} fornecedor(es) vinculado(s)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
