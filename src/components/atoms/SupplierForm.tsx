import { Button, TextInput, Stack, Group, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { CreateSupplierDto, UpdateSupplierDto, PersonType } from '@/types/supplier';
import { createSupplierSchema, updateSupplierSchema } from '@/schemas/supplier';
import { useState } from 'react';
import { CnpjInput } from './CnpjInput';
import { CepInput } from './CepInput';

interface SupplierFormProps {
  initialData?: Partial<CreateSupplierDto>;
  onSubmit: (data: CreateSupplierDto | UpdateSupplierDto) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export function SupplierForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  isLoading = false 
}: SupplierFormProps) {
  const [personType, setPersonType] = useState<PersonType>(
    initialData?.type || PersonType.Individual
  );

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      zipCode: initialData?.zipCode || '',
      type: initialData?.type || PersonType.Individual,
      cpf: initialData?.cpf || '',
      cnpj: initialData?.cnpj || '',
      rg: initialData?.rg || '',
      birthDate: initialData?.birthDate || new Date('1990-01-01T00:00:00.000').toUTCString(),
    },
    validate: zodResolver(isEditing ? updateSupplierSchema : createSupplierSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const submitData = isEditing 
      ? { 
          name: values.name || '',
          email: values.email || '',
          zipCode: values.zipCode || '',
          birthDate: values.birthDate || undefined,
        }
      : {
          name: values.name || '',
          email: values.email || '',
          zipCode: values.zipCode || '',
          type: values.type as PersonType,
          cpf: values.cpf || undefined,
          cnpj: values.cnpj || undefined,
          rg: values.rg || undefined,
          birthDate: values.birthDate || undefined,
        };

    onSubmit(submitData);
  };

  const handlePersonTypeChange = (value: string | null) => {
    const type = Number(value) as PersonType;
    setPersonType(type);
    form.setFieldValue('type', type);
    
    // Clear conditional fields when type changes
    form.setFieldValue('cpf', '');
    form.setFieldValue('cnpj', '');
    form.setFieldValue('rg', '');
    form.setFieldValue('birthDate', '');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {!isEditing && (
          <Select
            label="Tipo de Pessoa"
            placeholder="Selecione o tipo"
            value={form.values.type?.toString()}
            onChange={handlePersonTypeChange}
            data={[
              { value: PersonType.Individual.toString(), label: 'Pessoa Física' },
              { value: PersonType.Company.toString(), label: 'Pessoa Jurídica' },
            ]}
            error={form.errors.type}
            required
          />
        )}

        <TextInput
          label="Nome"
          placeholder="Digite o nome"
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          error={form.errors.name}
          required
        />

        <TextInput
          label="Email"
          placeholder="Digite o email"
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors.email}
          required
        />

        <CepInput
          value={form.values.zipCode}
          onChange={(value) => form.setFieldValue('zipCode', value)}
          error={form.errors.zipCode}
          required
        />

        {!isEditing && personType === PersonType.Individual && (
          <>
            <TextInput
              label="CPF"
              placeholder="Digite o CPF (apenas números)"
              value={form.values.cpf}
              onChange={(event) => form.setFieldValue('cpf', event.currentTarget.value.replace(/\D/g, ''))}
              error={form.errors.cpf}
              maxLength={11}
              required
            />

            <TextInput
              label="RG"
              placeholder="Digite o RG"
              value={form.values.rg}
              onChange={(event) => form.setFieldValue('rg', event.currentTarget.value.replace(/\D/g, ''))}
              error={form.errors.rg}
              maxLength={9}
              required
            />

            <DatePickerInput
              label="Data de Nascimento"
              placeholder="Selecione a data de nascimento"
              value={form.values.birthDate}
              onChange={(value) => form.setFieldValue('birthDate', value || '')}
              error={form.errors.birthDate}
              required
              locale="pt-BR"
              valueFormat="DD/MM/YYYY"
              maxDate={new Date()}
              clearable
            />
          </>
        )}

        {!isEditing && personType === PersonType.Company && (
          <CnpjInput
            value={form.values.cnpj}
            onChange={(value) => form.setFieldValue('cnpj', value)}
            error={form.errors.cnpj}
            required
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
