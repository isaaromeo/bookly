import { useNavigate} from "react-router-dom";
import { useState, useRef } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Separator,
  GridItem,
} from "@chakra-ui/react";
import BookGrid from "../styledComponents/BookGrid";
import UserRecomend from "../styledComponents/UserRecomend";
import Stats from "../styledComponents/Stats";
import headerImage from "../assets/headerOK.png";
import { useBooklyApi } from "../hooks/useBooklyApi";
import styled from "styled-components";
import { LuTrendingUp } from "react-icons/lu";
import CategorySection from "../styledComponents/CategorySection";

const HeroSection = styled.section`
  background-image: linear-gradient(
    0deg,
    rgba(133, 120, 171, 0) 0%,
    rgba(133, 120, 171, 0.88) 100%
  );
  background-repeat: repeat-x;
  background-position: bottom;
  text-align: center;
  width: 100%;
  padding: 3rem 1rem;

  border-radius: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    width: 95%;
    padding: 3rem 1rem;
  }
`;




const Explore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  // refs para autoscroll
  const fantasyRef = useRef(null);
  const romanceRef = useRef(null);
  const mysteryRef = useRef(null);
  const scifiRef = useRef(null);
  const adventureRef = useRef(null);
  const poetryRef = useRef(null);
  const distopyanRef = useRef(null);
  const businessRef = useRef(null);
  const selfhelpRef = useRef(null);
  const thrillerRef = useRef(null);
  

  
  const categories = [
    { name: "Fantasy", ref: fantasyRef },
    { name: "Romance", ref: romanceRef },
    { name: "Mystery", ref: mysteryRef },
    { name: "Sci-Fi", ref: scifiRef },
    { name: "Adventure", ref: adventureRef },
    { name: "Dystopian", ref: null },
    { name: "Thriller", ref: thrillerRef },
    { name: "Business", ref: null },
    { name: "Self-Help", ref: null },
    { name: "Poetry", ref: null },
  ];


 const {
   data: fantasyBooks,
   loading: fantasyLoading,
   error: fantasyError,
 } = useBooklyApi.useBooksByGenre("fantasy");
 const {
   data: adventureBooks,
   loading: adventureLoading,
   error: adventureError,
 } = useBooklyApi.useBooksByGenre("adventure");
 const {
   data: romanceBooks,
   loading: romanceLoading,
   error: romanceError,
 } = useBooklyApi.useBooksByGenre("romance");
 const { 
  data: mysteryBooks, 
  loading: mysteryLoading,
  error: misteryError 
 } = useBooklyApi.useBooksByGenre("mystery");
 const { 
  data: businessBooks,
  loading: businessLoading,
  error: businessError
 } = useBooklyApi.useBooksByGenre("business");
const {
  data: poetryBooks,
  loading: poetryLoading,
  error: poetryError,
  } = useBooklyApi.useBooksByGenre("poetry");
const {
  data: distopyanBooks,
  loading: distopyanLoading,
  error: distopyanError,
  } = useBooklyApi.useBooksByGenre("dystopian");
const {
  data: selfhelpBooks,
  loading: selfhelpLoading,
  error: selfhelpError,
  } = useBooklyApi.useBooksByGenre("self-help");
const {
  data: thrillerBooks,
  loading: thrillerLoading,
  error: thrillerError,
 } = useBooklyApi.useBooksByGenre("thriller");
const {
  data: scifiBooks,
  loading: scifiLoading,
  error: scifiError,
} = useBooklyApi.useBooksByGenre("sc-fi");


 const { data: allBooks, loading: allLoading } = useBooklyApi.useBooks();

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  const handleCategoryClick = (category) => {
    
    setActiveCategory(category.name.toLowerCase());

    const ref = category.ref;
    if (ref?.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };


  return (
    <Box minHeight="100vh" bg="bg.canvas" justifyItems="center">
      <HeroSection>
        <Container
          maxWidth="1200px"
          padding={{
            base: "0",
          }}
          justifyItems="center"
        >
          <Heading
            fontSize={{
              base: "2xl",
              sm: "2xl",
              md: "3xl",
              lg: "4xl",
            }}
            textAlign="center"
            color="brand.100"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            Explore Our Library
          </Heading>
          <Text
            fontSize={{
              base: "md",
              sm: "md",
              md: "lg",
              lg: "lg",
            }}
            width={{
              base: "100%",
              sm: "90%",
              md: "80%",
              lg: "80%",
            }}
            color="secondary.200"
            textAlign="center"
            paddingTop="1rem"
          >
            Dive into our vast collection of books, discover community
            favorites, and find your next great read!
          </Text>
        </Container>
      </HeroSection>
      <Container maxWidth="1200px" py="8" alignContent="center">
        <VStack gap="6" mb="8" paddingTop="1rem">
          <Heading size="lg">Browse by category</Heading>
          <SimpleGrid
            columns={{ base: 2, sm: 4, md: 5, lg: 5 }}
            gap="3"
            width="100%"
          >
            {categories.map((category) => (
              <Button
                key={category.name}
                bg="brand.900"
                color="brand.100"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                variant={
                  activeCategory === category.name.toLowerCase()
                    ? "solid"
                    : "outline"
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>

        <Stats />
        <UserRecomend />
        <VStack gap="6" align="stretch" mb="12">
          <Heading
            size={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "xl",
            }}
            textAlign="left"
            pl="1rem"
          >
            <LuTrendingUp style={{ display: "inline", marginRight: "12px" }} />
            Trending Now
          </Heading>
          <BookGrid
            books={allBooks?.slice(0, 8) || []}
            loading={allLoading}
            onBookSelect={handleBookSelect}
          />
        </VStack>

        <Box  maxWidth="1200px" margin="0 auto">
          <VStack gap="8" align="stretch">
            <CategorySection
              title="Fantasy"
              books={fantasyBooks}
              loading={fantasyLoading}
              onBookSelect={handleBookSelect}
              categoryRef={fantasyRef}
            />

            <CategorySection
              title="Romantic Stories"
              books={romanceBooks}
              loading={romanceLoading}
              onBookSelect={handleBookSelect}
              categoryRef={romanceRef}
            />

            <CategorySection
              title="Mystery"
              books={mysteryBooks}
              loading={mysteryLoading}
              onBookSelect={handleBookSelect}
              categoryRef={mysteryRef}
            />

            <CategorySection
              title="Adventures"
              books={adventureBooks}
              loading={adventureLoading}
              onBookSelect={handleBookSelect}
              categoryRef={adventureRef}
            />

            <CategorySection
              title="Sci-Fi"
              books={scifiBooks}
              loading={scifiLoading}
              onBookSelect={handleBookSelect}
              categoryRef={scifiRef}
            />

            <CategorySection
              title="Thriller"
              books={thrillerBooks}
              loading={thrillerLoading}
              onBookSelect={handleBookSelect}
              categoryRef={thrillerRef}
            />

            <CategorySection
              title="Dystopian"
              books={distopyanBooks}
              loading={distopyanLoading}
              onBookSelect={handleBookSelect}
              categoryRef={distopyanRef}
            />

            <CategorySection
              title="Business"
              books={businessBooks}
              loading={businessLoading}
              onBookSelect={handleBookSelect}
              categoryRef={businessRef}
            />

            <CategorySection
              title="Poetry"
              books={poetryBooks}
              loading={poetryLoading}
              onBookSelect={handleBookSelect}
              categoryRef={poetryRef}
            />

            <CategorySection
              title="Self-Help"
              books={selfhelpBooks}
              loading={selfhelpLoading}
              onBookSelect={handleBookSelect}
              categoryRef={selfhelpRef}
            />

            <VStack gap="6" align="stretch" mb="8">
              <Heading size="lg">Complete Collection</Heading>
              <Text color="fg.muted">
                Browse through our entire library of {allBooks?.length || 0}{" "}
                books
              </Text>
              <BookGrid
                books={allBooks}
                loading={allLoading}
                onBookSelect={handleBookSelect}
              />
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Explore;
