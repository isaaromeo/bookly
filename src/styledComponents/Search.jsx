import { useEffect, useState, useRef} from "react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useClickOutside } from "../hooks/useClickOutside";
import { BookResult } from "./BookResult.jsx"
import {
  Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBookSearch } from "../hooks/useBookSearch";
import SearchInput from "./SearchInput";
import BookList from "./BookList";

export const Search = () => {

  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [showResults, setShowResults] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();
  

  const { query, setQuery, results, loading, clearSearch } =
    useBookSearch();

  useClickOutside(searchRef, () => {
    if (results.length > 0) {
      clearSearch();
    }
  });

  //TODO: Hacer hook personalizado para el search
  // useEffect(() => {
  //   const searchBooks = async () => {
  //     if (searchQuery.length < 2) {
  //       setSearchResults([]);
  //       setShowResults(false); 
  //       return;
  //     }

  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://bookly-back.onrender.com/api/books"
  //       );
  //       if (response.ok) {
  //         const allBooks = await response.json();

  //         const filteredBooks = allBooks.filter(
  //           (book) =>
  //             book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //             book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //             book.isbn?.includes(searchQuery)
  //         );

  //         setSearchResults(filteredBooks);
  //         setShowResults(true);
  //         console.log("results: ", searchResults);
  //       }
  //     } catch (error) {
  //       console.error("Error searching books:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const timeoutId = setTimeout(searchBooks, 300);
    
  //   return () => clearTimeout(timeoutId);
    
  // }, [searchQuery]);

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };


  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchResults.length > 0) {
  //     console.log("results: ", searchResults)
  //     setShowResults(true);
  //   }
  // };


  return (
    <Box position="relative" width="100%" maxWidth="500px" ref={searchRef}>
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onClear={clearSearch}
        placeholder="Search books by author, title, ISBN..."
        rounded="full"
      />

      {/* Mostrar resultados solo cuando hay query */}
      {query && (
        <BookList.Variants.Dropdown
          books={results}
          loading={loading}
          emptyMessage="No books found. Try another search!"
        />
      )}
    </Box>
  );
};

export default Search;
