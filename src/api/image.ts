import axiosInstance, { endpoints } from '../utils/axios';

export const searchImages = async (formData: FormData) => {
  const res = await axiosInstance.post(endpoints.image.search, formData);
  return res.data;
};
