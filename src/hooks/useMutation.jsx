import { useState } from "react";

export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const token = localStorage.getItem("token");
      const isFormData = options.body instanceof FormData;
      const config = {
        method: options.method || "POST",
        headers: {
         
          Authorization: `Bearer ${token}`,
          
        },
        body: options.body,
      };

       if (!isFormData && options.body) {
         config.headers["Content-Type"] = "application/json";
         config.body = JSON.stringify(options.body);
       }

      const response = await fetch(
        `https://bookly-back.onrender.com/api${endpoint}`,
        config
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `${options.method || "POST"} request failed`
        );
      }

      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
    data,
    
  };
};
