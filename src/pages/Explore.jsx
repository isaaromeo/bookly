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
import BookGrid from "../styledComponents/BookGrid2";
import UserRecomend from "../styledComponents/UserRecomend";
import Stats from "../styledComponents/Stats";
import headerImage from "../assets/headerOK.png";
import { useBooklyApi } from "../hooks/useBooklyApi";
import styled from "styled-components";
import { LuTrendingUp } from "react-icons/lu";


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
  padding: 4rem 1rem;
  
  border-radius: 20px;
`;


const CategorySection = ({
  title,
  books,
  loading,
  error,
  onBookSelect,
  categoryRef,
}) => {
  if (error) {
    return (
      <Alert.Root status="error" mb="6">
        <Alert.Indicator />
        <Alert.Title>Error loading: {error}</Alert.Title>
      </Alert.Root>
    );
  }

  const featuredBooks = books?.slice(0, 6) || [];

  return (
    <VStack gap="6" align="stretch" mb="12" ref={categoryRef}>
          <HStack justify="space-between" align="center">
            <Heading size="lg" id={title.toLowerCase().replace(/\s+/g, "-")}>
              {title}
            </Heading>
            <Button variant="ghost" size="sm">
              See All
            </Button>
          </HStack>
    
          {loading ? (
            <Box display="flex" justifyContent="center" padding="8">
              <Spinner size="lg" />
            </Box>
          ) : (
            <BookGrid
              books={featuredBooks}
              onBookSelect={onBookSelect}
              emptyMessage={`No ${title.toLowerCase()} books found`}
            />
          )}
        </VStack>
  );
};

const Explore = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  // refs para autoscroll
  const fantasyRef = useRef(null);
  const romanceRef = useRef(null);
  const mysteryRef = useRef(null);
  const scifiRef = useRef(null);
  const adventureRef = useRef(null);
  const thrillerRef = useRef(null);

  
  const categories = [
    { name: "Fantasy", ref: fantasyRef },
    { name: "Romance", ref: romanceRef },
    { name: "Mystery", ref: mysteryRef },
    { name: "Sci-Fi", ref: scifiRef },
    { name: "Adventure", ref: adventureRef },
    { name: "History", ref: null },
    { name: "Thriller", ref: thrillerRef },
    { name: "Business", ref: null },
    { name: "Technology", ref: null },
    { name: "Art", ref: null },
  ];

 //Con nuevo hook useApi general
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
  data: scifiBooks,
  loading: scifiLoading,
  error: scifiError
 } = useBooklyApi.useBooksByGenre("sci-fi");

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
    <Box minHeight="100vh" bg="bg.canvas">
      <HeroSection>
        <Container maxWidth="1200px">
          <Heading size="2xl" textAlign="center">
            Explore Our Library
          </Heading>
          <Text
            fontSize="lg"
            color="fg.muted"
            textAlign="center"
            maxWidth="600px"
          >
            Dive into our vast collection of books, discover community
            favorites, and find your next great read
          </Text>
        </Container>
      </HeroSection>

      <VStack gap="6" mb="8">
        <Heading size="lg">Browse by category</Heading>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap="3" width="100%">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                activeCategory === category.name.toLowerCase()
                  ? "solid"
                  : "outline"
              }
              colorPalette="purple"
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
        <Heading size="xl">
          <LuTrendingUp style={{ display: "inline", marginRight: "12px" }} />
          Trending Now
        </Heading>
        <BookGrid
          books={allBooks?.slice(0, 8) || []}
          loading={allLoading}
          onBookSelect={handleBookSelect}
        />
      </VStack>

      <Box padding="6" maxWidth="1200px" margin="0 auto">
        <VStack gap="8" align="stretch">
          <CategorySection
            title="Fantasy Adventures"
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
            title="Sci-Fi"
            books={scifiBooks}
            loading={scifiLoading}
            onBookSelect={handleBookSelect}
            categoryRef={scifiRef}
          />

          <VStack gap="6" align="stretch" mb="8">
            <Heading size="lg">Complete Collection</Heading>
            <Text color="fg.muted">
              Browse through our entire library of {allBooks?.length || 0} books
            </Text>
            <BookGrid
              books={allBooks}
              loading={allLoading}
              onBookSelect={handleBookSelect}
            />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Explore;
