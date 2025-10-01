import { TextInput, TextInputProps } from '@mantine/core';

interface CepInputProps extends Omit<TextInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function CepInput({ value, onChange, ...props }: CepInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove todos os caracteres não numéricos
    const numericValue = event.currentTarget.value.replace(/\D/g, '');
    onChange(numericValue);
  };

  return (
    <TextInput
      label="CEP"
      placeholder="Digite o CEP (apenas números)"
      value={value}
      onChange={handleChange}
      maxLength={8}
      {...props}
    />
  );
}
