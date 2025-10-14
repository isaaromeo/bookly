import { useState, useEffect } from "react";

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    method = "GET",
    body = null,
    headers = {},
  } = options;

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

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


        const response = await fetch(
          `https://bookly-back.onrender.com/api${endpoint}`,
          config
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);

        
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body]);


  return {
    data,
    loading,
    error,
  };
};
