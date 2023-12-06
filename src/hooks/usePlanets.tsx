import { config } from "../config";
import useSWR, { SWRConfiguration } from "swr";
const { apiBasePath } = config;

interface CustomError extends Error {
  info?: string;
  status?: number;
}

const planetsFetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: CustomError = new Error(
      "An error occurred while fetching the Planets."
    );
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const configuration: SWRConfiguration = {
  onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
    // Never retry on 404.
    if (error.status === 404) return;

    // Only retry up to 3 times.
    if (retryCount >= 3) return;

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

export const usePlanets = (page: string) => {
  const url = `${apiBasePath}/planets/?page=${+page}`;
  const {
    data: planets,
    error,
    isLoading,
  } = useSWR(url, planetsFetcher, configuration);

  return { planets, error, isLoading };
};
