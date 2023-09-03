import api from '../../../service';

const patch = 'user';
export const getList = async () => {
  const response = await api.get(`/${patch}/list`);
  return response.data;
};
