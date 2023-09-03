import api from '../../../service';

export const getList = async () => {
  const response = await api.get('/list');
  return response.data;
};
