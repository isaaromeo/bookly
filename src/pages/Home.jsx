
import { useApiData } from "../hooks/useApiData";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Grid,
  RatingGroup,
  Button,
} from "@chakra-ui/react";

import BookGrid from "../styledComponents/BookGrid";
import { useBookSearch } from "../hooks/useBookSearch";

import styled from "styled-components";

const HeroSection = styled.div`
  background: linear-gradient(135deg, #836e99 0%, #45385a 100%);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 3rem;
`;

const Home = () => {

  const books = useApiData(
    "https://bookly-back.onrender.com/api/books",
    "books"
  );
  console.log(books)
  const navigate = useNavigate();

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  const featuredBooks = books.slice(0, 6);
  return (
    <Box>
      <HeroSection>
              <Text fontSize="4xl" fontWeight="bold" color="white" mb="4">
                Discover your next book obsession!
              </Text>
              <Text fontSize="xl" color="white" mb="6" opacity="0.9">
                Find recomendtion, share your reviews and connect with other readers.
              </Text>
              <Button size="lg" colorPalette="purple">
                Explore Books
              </Button>
            </HeroSection>

            <Box minHeight="100vh" bg="bg.canvas" padding="6">
                    
                    <BookGrid
                      books={featuredBooks}
                      onBookSelect={handleBookSelect}
                    />
                  
              </Box>
    </Box>
    
  );
};

export default Home;
