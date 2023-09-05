import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string().required('Campo obrigatório'),
  typeOfAccess: Yup.string().required('Campo obrigatório'),
  status: Yup.string().required('Campo obrigatório'),
  nameTeam: Yup.string().test(
    'is-required',
    'Campo obrigatório',
    function (value) {
      if (this.parent.id === 0) {
        return true;
      }
      return !value;
    },
  ),
  statusTeam: Yup.string().test(
    'is-required',
    'Campo obrigatório',
    function (value) {
      if (this.parent.id === 0) {
        return true;
      }
      return !value;
    },
  ),
});

export default validationSchema;
