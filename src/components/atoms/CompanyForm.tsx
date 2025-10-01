import { Button, TextInput, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { CreateCompanyDto, UpdateCompanyDto } from '@/types/company';
import { createCompanySchema, updateCompanySchema } from '@/schemas/company';
import { CnpjInput } from './CnpjInput';
import { CepInput } from './CepInput';

interface CompanyFormProps {
  initialData?: Partial<CreateCompanyDto>;
  onSubmit: (data: CreateCompanyDto | UpdateCompanyDto) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export function CompanyForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  isLoading = false 
}: CompanyFormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      cnpj: initialData?.cnpj || '',
      fantasyName: initialData?.fantasyName || '',
      zipCode: initialData?.zipCode || '',
    },
    validate: zodResolver(isEditing ? updateCompanySchema : createCompanySchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const submitData = isEditing 
      ? { fantasyName: values.fantasyName || '' }
      : {
          cnpj: values.cnpj || '',
          fantasyName: values.fantasyName || '',
          zipCode: values.zipCode || '',
        };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {!isEditing && (
          <CnpjInput
            value={form.values.cnpj}
            onChange={(value) => form.setFieldValue('cnpj', value)}
            error={form.errors.cnpj}
          />
        )}

        <TextInput
          label="Nome Fantasia"
          placeholder="Digite o nome fantasia"
          value={form.values.fantasyName}
          onChange={(event) => form.setFieldValue('fantasyName', event.currentTarget.value)}
          error={form.errors.fantasyName}
        />

        {!isEditing && (
          <CepInput
            value={form.values.zipCode}
            onChange={(value) => form.setFieldValue('zipCode', value)}
            error={form.errors.zipCode}
          />
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Atualizar' : 'Criar'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
