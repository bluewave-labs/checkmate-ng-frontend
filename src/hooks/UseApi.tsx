import { useState } from "react";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import type { AxiosRequestConfig } from "axios";
import { get, post, patch } from "@/utils/ApiClient";
import { useAppSelector } from "@/hooks/AppHooks";
export type ApiResponse = {
  message: string;
  data: any;
};

// Generic fetcher for GET requests
const fetcher = async <T,>(url: string, config?: AxiosRequestConfig) => {
  const res = await get<T>(url, config);
  return res.data;
};
export const useGet = <T,>(
  url: string,
  axiosConfig?: AxiosRequestConfig,
  swrConfig?: SWRConfiguration<T, Error>,
  keyOnTeamId: boolean = false
) => {
  const currentTeamId = useAppSelector((state) => state.auth.selectedTeamId);
  console.log(currentTeamId);
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    keyOnTeamId && currentTeamId ? [url, currentTeamId] : url,
    (key) => {
      const targetUrl = Array.isArray(key) ? key[0] : key;
      return fetcher<T>(targetUrl, {
        ...axiosConfig,
        headers: {
          ...axiosConfig?.headers,
          ...(currentTeamId ? { "x-team-id": currentTeamId } : {}),
        },
      });
    },
    swrConfig
  );

  return {
    response: data ?? null,
    loading: isLoading,
    isValidating,
    error: error?.message ?? null,
    refetch: mutate,
  };
};

export const usePost = <B = any, R = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postFn = async (
    endpoint: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<R | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await post<R>(endpoint, body, config);
      return res.data;
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.msg || err.message || "An error occurred";
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { post: postFn, loading, error };
};

export const usePatch = <B = any, R = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchFn = async (
    endpoint: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<R | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await patch<R>(endpoint, body, config);
      return res.data;
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.msg || err.message || "An error occurred";
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { patch: patchFn, loading, error };
};
