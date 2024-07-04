import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from '../utils/axios';

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export const searchImages = async (formData: FormData) => {
  const res = await axiosInstance.post(endpoints.image.search, formData);
  return res.data;
};

export function useImageOverview(dataset: string, shouldFetch: boolean = true) {
  const URL = dataset && shouldFetch ? endpoints.image.overview(dataset) : null;
  const { data, isLoading, isValidating, mutate, error } = useSWR(URL, fetcher, options);

  return useMemo(
    () => ({
      data: data as { ok: boolean; names: string[] },
      isLoading,
      isValidating,
      error,
      mutate,
    }),
    [data, isLoading, isValidating, error, mutate]
  );
}

export function useImageCaption(dataset?: string, name?: string, shouldFetch: boolean = true) {
  const URL = dataset && shouldFetch && name ? endpoints.image.caption(dataset, name) : null;
  const { data, isLoading, isValidating, mutate, error } = useSWR(URL, fetcher, options);

  return useMemo(
    () => ({
      data: data as { ok: boolean; names: string[] },
      isLoading,
      isValidating,
      error,
      mutate,
    }),
    [data, isLoading, isValidating, error, mutate]
  );
}

export async function searchImageByCaption(dataset: string, name: string, caption: string) {
  const res = await axiosInstance.get(endpoints.image.results(dataset, name, caption));
  return res.data;
}
