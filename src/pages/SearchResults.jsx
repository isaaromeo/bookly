import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Spinner,
  Alert
} from "@chakra-ui/react";
import { LuArrowLeft, LuHouse } from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useBookSearch } from "../hooks/useBookSearch"; 

export const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { results: searchBooks, loading, error } = useBookSearch(query);
  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }
  });

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        bg="bg.canvas"
        padding="6"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  
  if (error) {
    return (
      <Box minHeight="100vh" bg="bg.canvas" padding="6">
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>Error searching books: {error}</Alert.Title>
        </Alert.Root>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bg="bg.canvas" padding="6">
      <Text fontSize="xl" color="fg.muted" mb="4" fontWeight="semibold" textAlign="left">
        Search Results for "{query}"
      </Text>
      <BookGrid
        books={searchBooks}
        loading={loading}
        onBookSelect={handleBookSelect}
        emptyMessage={`No books found for "${query}". Try another search!`}
      />
    </Box>
  );
};

export default SearchResults;
