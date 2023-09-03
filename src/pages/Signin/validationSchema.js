import * as Yup from 'yup';

const validationSchema = Yup.object({
  cpf: Yup.string().trim().required('Campo Obrigatório'),
});

export default validationSchema;
