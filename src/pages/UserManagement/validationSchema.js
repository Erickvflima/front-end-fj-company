import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .min(11, 'CPF deve conter no minimo 11 digitos')
    .max(11, 'CPF deve conter até 11 digitos')
    .required('Campo obrigatório')
    .trim(),
  typeOfAccess: Yup.string().required('Campo obrigatório'),
  status: Yup.string().required('Campo obrigatório'),
  nameTeam: Yup.string().required('Campo obrigatório'),
  statusTeam: Yup.string().required('Campo obrigatório'),
});

export default validationSchema;
