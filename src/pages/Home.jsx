
import { useBooklyApi } from "../hooks/useBooklyApi";
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
import headerImage from "../assets/headerOK.png";
import { booklyTheme, lightTheme } from "../data/booklyTheme";

import styled from "styled-components";

// Hero section que ocupa todo el ancho
const HeroSection = styled.section`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  text-align: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const HeroContent = styled.div`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  background-image: url(${headerImage});
  background-repeat: repeat-x;
  background-position: bottom;
  text-align: center;
  border-radius: 12px;
  align-self: center;
  width: 100%;
  display: flex;
  flex-direction: column;

`;

const DiscoverSection = styled.div`
  background: transparent;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 5rem;
`;

const Home = () => {
  //Con nuevo hook useApi general
  const { data: books, loading, error } = useBooklyApi.useBooks();
  console.log(books);
  const navigate = useNavigate();

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const featuredBooks = books.slice(0, 6);
  return (
    <Box>
      <HeroSection>
        <HeroContent>
          <DiscoverSection>
            <Text fontSize="4xl" fontWeight="bold" color="white" mb="4">
              Discover your next book obsession!
            </Text>
            <Text fontSize="xl" color="white" mb="6" opacity="0.9">
              Find recomendtion, share your reviews and connect with other
              readers.
            </Text>
            <Button size="lg" bg="brand.500" borderColor="brand.900" color="brand.900" onClick={() => navigate("/books")}>
              Explore Books
            </Button>
          </DiscoverSection>
        </HeroContent>
      </HeroSection>
      
     
      <Box minHeight="100vh" bg="bg.canvas" padding="6">
        <BookGrid books={featuredBooks} onBookSelect={handleBookSelect} />
      </Box>
    </Box>
  );
};

export default Home;
