import * as Yup from 'yup';

const validationSchema = Yup.object({
  cpf: Yup.string()
    .min(11, 'CPF deve conter no minimo 11 digitos')
    .max(11, 'CPF deve conter até 11 digitos')
    .required('Campo obrigatório')
    .trim(),
});

export default validationSchema;
