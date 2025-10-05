import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { LuArrowLeft, LuHouse } from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid";
import { useBookSearch } from "../hooks/useBookSearch";

export const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { 
    results, 
    loading, 
  } = useBookSearch(query);
 
  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }})

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  return (
    <Box minHeight="100vh" bg="bg.canvas" padding="6">
        <BookGrid
          books={results}
          loading={loading}
          onBookSelect={handleBookSelect}
          emptyMessage={`No books found for "${query}". Try another search!`}
        />
      
    </Box>
  );
};

export default SearchResults;
