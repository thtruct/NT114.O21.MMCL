import { endpoints } from './axios';

export const getLink = (path: string) => endpoints.image.getImage(path);
