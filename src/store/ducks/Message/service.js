import api from '../../../service';

const patch = 'message';

export const getList = async (payload) => {
  const response = await api.get(`/${patch}/list`, { params: payload });
  return response.data;
};

export const putMessage = async (payload) => {
  const queryParams = new URLSearchParams(payload).toString();
  const response = await api.put(`/${patch}/changeMessage/?${queryParams}`);
  return response.data;
};

export const postMessage = async (payload) => {
  const queryParams = new URLSearchParams(payload).toString();
  const response = await api.post(`/${patch}/new/?${queryParams}`);
  return response.data;
};

export const deleteMessage = async (payload) => {
  const response = await api.delete(`/${patch}/`, { params: payload });
  return response.data;
};
