export const customTextColor = (value) => {
  switch (value) {
    case 'Cancelado':
      return 'error';
    case 'Expirado':
      return 'draft';
    case 'Pendente':
      return 'warning';
    case 'Colaborador':
      return 'info';
    case 'Ativo':
      return 'success';
    case 'Inativo':
      return 'draft';
    default:
      return 'info';
  }
};
