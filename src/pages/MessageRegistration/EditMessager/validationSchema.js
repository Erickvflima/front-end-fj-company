import * as Yup from 'yup';

const validationSchema = Yup.object({
  description: Yup.string().required('Campo obrigatório'),
  status: Yup.string().required('Campo obrigatório'),
});

export default validationSchema;
