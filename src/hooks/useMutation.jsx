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
      const hasBody = options.body !== undefined && options.body !== null;
      const config = {
        method: options.method || "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        body: options.body,
      };

          if (hasBody) {
            if (isFormData) {
              // Para FormData: NO Content-Type, body directo
              config.body = options.body;
            } else {
              // Para JSON: Content-Type + stringify
              config.headers["Content-Type"] = "application/json";
              config.body = JSON.stringify(options.body);
            }
          }

      const response = await fetch(
        `http://localhost:3001/api${endpoint}`,
        config
      );

      let result;
      try {
        result = await response.json();
        console.log("Response data:", result);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error(`Failed to parse response: ${parseError.message}`);
      }

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
