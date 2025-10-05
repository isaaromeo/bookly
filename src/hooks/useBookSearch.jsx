import { useState, useEffect } from "react";

export const useBookSearch = (initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //para sincronizar el estado query si este cambia
  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const searchBooks = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://bookly-back.onrender.com/api/books"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const allBooks = await response.json();

        const filteredBooks = allBooks.filter(
          (book) =>
            book.title?.toLowerCase().includes(query.toLowerCase()) ||
            book.author?.toLowerCase().includes(query.toLowerCase()) ||
            book.isbn?.includes(query)
        );

        setResults(filteredBooks); 
      } catch (err) {
        console.error("Error searching books:", err);
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchBooks, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  return {
    query,
    results,
    loading,
    error,
    setQuery,
    clearSearch,
  };
};
