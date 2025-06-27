import { fetcher } from "@/lib/fetcher";
import config from "@/utils/config";
import useSWR from "swr";

const apiUrl = config.apiUrl;

export const useFetchTemplates = () => {
  return useSWR(`${apiUrl}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 6000,
  });
};
