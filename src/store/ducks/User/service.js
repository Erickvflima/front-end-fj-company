import api from '../../../service';

const patch = 'user';
export const getList = async () => {
  const response = await api.get(`/${patch}/list`);
  return response.data;
};
export const postSignin = async (cpf) => {
  const response = await api.post(`/${patch}/signin?cpf=${cpf}`);
  api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  return response.data;
};
