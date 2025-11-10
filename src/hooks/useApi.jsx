import { useState, useEffect } from "react";

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    method = "GET",
    body = null,
    headers = {},
    cacheKey = null //añadimos control de cache porque a veces tarda en cargar los datos
  } = options;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body && method !== "GET") {
        config.body = JSON.stringify(body);
      }

      if (cacheKey) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setData(JSON.parse(cached));

          setLoading(false);
        }
      }

      const response = await fetch(
        `https://bookly-back.onrender.com/api${endpoint}`,
        config
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);

      if (cacheKey) {

        localStorage.setItem(cacheKey, JSON.stringify(result));
      }
    } catch (err) {

      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    fetchData();
  }, [endpoint, method, body, cacheKey]);

  const refetch = () => {
    if (endpoint) {
      fetchData();
    }
  };


  return {
    data,
    loading,
    error,
    refetch
  };
};
