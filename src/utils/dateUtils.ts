export function formatDateForDisplay(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const localDate = new Date(year, month, day);
  
  return localDate.toLocaleDateString('pt-BR');
}

export function formatDateSimple(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('pt-BR');
}
