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
export const postSignup = async (payload) => {
  const queryParams = new URLSearchParams(payload).toString();
  const response = await api.post(`/${patch}/signup?${queryParams}`);
  return response.data;
};
