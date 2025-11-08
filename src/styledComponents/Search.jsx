import {  useState, useRef} from "react";
import { Input, InputGroup, Kbd, Text, IconButton } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";
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

  const searchRef = useRef();
  const navigate = useNavigate();
  const [showAllResults, setShowAllResults] = useState(false);
  

  const { query, setQuery, results, loading, clearSearch } =
    useBookSearch();

  useClickOutside(searchRef, () => {
    if (results.length > 0 && !showAllResults) {
      clearSearch();
    }
  });

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
    clearSearch();
    setShowAllResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.length >= 2) {
      navigate(`/search?q=${query}`);
      clearSearch();
      setShowAllResults(false);
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      maxWidth={{
        base: "60%",
        sm: "70%",
        md: "70%",
        lg: "100%",
      }}
      
      ref={searchRef}
      flex="1"
    >
      <form onSubmit={handleSearchSubmit}>
        <SearchInput
          query={query}
          onQueryChange={setQuery}
          onClear={() => {
            clearSearch();
            setShowAllResults(false);
          }}
          placeholder="Search books by author, title, ISBN..."
          rounded="full"
        />
      </form>

      {query && !showAllResults && (
        <BookList
          books={results}
          loading={loading}
          onBookSelect={handleBookSelect}
          emptyMessage="No books found. Try another search!"
        />
      )}
    </Box>
  );
};

export default Search;
