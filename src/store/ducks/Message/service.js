import api from '../../../service';

const patch = 'message';
export const getList = async (payload) => {
  const response = await api.get(`/${patch}/list`, { params: payload });
  return response.data;
};
