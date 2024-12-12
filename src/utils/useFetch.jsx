import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import config from "./config";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);

  const { keycloak } = useKeycloak();

  const stored_token = localStorage.getItem("token");
  const kc_token = keycloak.token ? keycloak.token : stored_token;

  const axiosInstance = axios.create({
    baseURL: `${config.baseUrl}`,
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      if (kc_token) {
        config.headers.Authorization = `Bearer ${kc_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (keycloak.authenticated) {
      setAccessToken(keycloak.token);
      setAuth(true);
    }

    if (kc_token) {
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [kc_token, url, keycloak]);

  return { data, isLoading, error, auth };
}

export default useFetch;
