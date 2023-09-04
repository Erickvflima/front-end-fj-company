import api from '../../../service';

const patch = 'team';
export const getList = async (payload) => {
  const response = await api.get(`/${patch}/list`, { params: payload });
  return response.data;
};
