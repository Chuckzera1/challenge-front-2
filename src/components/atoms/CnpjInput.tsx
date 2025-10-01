import { TextInput, TextInputProps } from '@mantine/core';

interface CnpjInputProps extends Omit<TextInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function CnpjInput({ value, onChange, ...props }: CnpjInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove todos os caracteres não numéricos
    const numericValue = event.currentTarget.value.replace(/\D/g, '');
    onChange(numericValue);
  };

  return (
    <TextInput
      label="CNPJ"
      placeholder="Digite o CNPJ (apenas números)"
      value={value}
      onChange={handleChange}
      maxLength={14}
      {...props}
    />
  );
}
