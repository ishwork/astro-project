export const formatYear = (dateValue: string): string => {
  if (!dateValue) return 'Unknown year';

  return new Date(dateValue).getFullYear().toString();
};
