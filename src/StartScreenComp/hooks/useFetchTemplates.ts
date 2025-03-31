import { fetcher } from "@/lib/fetcher";
import config from "@/utils/config";
import useSWR from "swr";

const apiUrl = config.apiUrl;

export const useFetchTemplates = () => {
  return useSWR(`${apiUrl}`, fetcher, {
    dedupingInterval: 0,
  });
};
