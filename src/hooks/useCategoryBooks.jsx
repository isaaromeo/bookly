import { useState, useEffect } from "react";

export const useCategoryBooks = (category = "") => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
    
      if (!category || category.trim().length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
 

        const response = await fetch(
          `https://bookly-back.onrender.com/api/books/genre/${category.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const books = await response.json();
        setResults(books);
      } catch (err) {
        console.error("Error searching books:", err);
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

      fetchCategoryBooks();
    
  }, [category]);

  return {
    results,
    loading,
    error,

  };
};
