import { Button, TextInput, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { CreateCompanyDto, UpdateCompanyDto } from '@/types/company';
import { createCompanySchema, updateCompanySchema } from '@/schemas/company';

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
          <TextInput
            label="CNPJ"
            placeholder="Digite o CNPJ (apenas números)"
            value={form.values.cnpj}
            onChange={(event) => form.setFieldValue('cnpj', event.currentTarget.value)}
            error={form.errors.cnpj}
            maxLength={14}
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
          <TextInput
            label="CEP"
            placeholder="Digite o CEP (apenas números)"
            value={form.values.zipCode}
            onChange={(event) => form.setFieldValue('zipCode', event.currentTarget.value)}
            error={form.errors.zipCode}
            maxLength={8}
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
