
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Stack,
  Grid,
  RatingGroup,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Separator,
  GridItem,
  Blockquote,
  Spinner,
  Flex,
  Highlight,
  Container
} from "@chakra-ui/react";
import {
  LuBook,
  LuHouse,
  LuTrendingUp,
  LuUserPlus,
  LuUsers,
  LuStar,
  LuMoveUpRight
} from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid";
import headerImage from "../assets/headerOK.png";
import headerImage2 from "../assets/images/headerUpdate.png";
import FeatureCard from "../styledComponents/FeatureCard";
import Stats from "../styledComponents/Stats";
import styled from "styled-components";


const HeroSection = styled.section`
  background-image: linear-gradient(
      0deg,
      rgba(133, 120, 171, 0) 0%,
      rgba(133, 120, 171, 0.88) 100%
    ),
    url(${headerImage2});
  background-repeat: repeat-x;
  background-position: bottom;
  text-align: center;
  width: 100%;
  padding: 4rem 1rem;
  margin-top: 1rem;
  border-radius: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    width: 95%;
    padding: 3rem 1rem;
  }
`;

const features = [
    {
      icon: <LuBook />,
      title: "Track Your Reading",
      description: "Keep track of books you've read and want to read"
    },
    {
      icon: <LuUsers />,
      title: "Join Community",
      description: "Connect with fellow book lovers and share insights"
    },
    {
      icon: <LuStar />,
      title: "Rate & Review",
      description: "Share your thoughts and discover new perspectives"
    },
    {
      icon: <LuTrendingUp />,
      title: "Discover Trends",
      description: "See what's popular and find your next favorite read"
    }
  ];

    const userFeedback = [
      {
        quote:
          "Bookly has completely transformed how I discover and track my reading. The community recommendations are spot on!",
        author: "Sarah M.",
        role: "Avid Reader",
      },
      {
        quote:
          "As a book club organizer, this platform has made it so easy to find books and discuss them with my group.",
        author: "Michael T.",
        role: "Book Club Leader",
      },
      {
        quote:
          "The reading challenges and tracking features have helped me read more consistently than ever before.",
        author: "Jessica L.",
        role: "Casual Reader",
      },
    ];

const Home = () => {
  const { data: books, loading, error } = useBooklyApi.useBooks();
  const navigate = useNavigate();

  //TODO filtrar de forma real
  const featuredBooks = books?.slice(0, 10) || [];
  const trendingBooksList = books?.slice(0, 8) || [];
  const newReleases = books?.slice(8, 16) || [];

  const isaId = "68f26a93086e5c6b2e14f139";
  const pedriId = "68fd3eb969960b641fcd907d";
  // const {
  //   data: dataIsa,
  //   loading: loadingIsa,
  //   error: errorIsa,
  // } = useBooklyApi.useUser(isaId);

  // const {
  //   data: dataPedri,
  //   loading: loadingPedri,
  //   error: errorPedri,
  // } = useBooklyApi.useUser(pedriId);

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  // const realRecommendations = [
  //   {
  //     user: dataIsa?.username || "Isa",
  //     liked: dataIsa?.library?.slice(0, 3) || [],
  //     discovered: dataIsa?.library?.slice(0, 3) || [],
  //   },
  //   {
  //     user: dataPedri?.username || "Pedri",
  //     liked: dataPedri?.library?.slice(0, 3) || [],
  //     discovered: dataPedri?.library?.slice(0, 3) || [],
  //   },
  // ];

  //|| loadingIsa || loadingPedri
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="50vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  //|| errorIsa || errorPedri
  if (error) {
    return (
      <Box textAlign="center" py="8">
        <Text color="red.500">Error loading data</Text>
      </Box>
    );
  }

  return (
    <Box justifyItems="center">
      <HeroSection>
        <Container
          maxWidth="1200px"
          padding={{
            base: "0",
          }}
        >
          <VStack gap="6" color="white">
            <Heading
              style={{
                fontFamily: "'Cinzel', serif",
              }}
              fontSize={{
                base: "2xl",
                sm: "2xl",
                md: "3xl",
                lg: "4xl",
              }}
            >
              Discover Your Next Favorite Book
            </Heading>
            <Text
              fontSize={{
                base: "md",
                sm: "lg",
                md: "lg",
                lg: "xl",
              }}
              paddingBottom={{
                base: "1rem",
                sm: "1rem",
                md: "2rem",
                lg: "2rem",
              }}
              color="secondary.200"
              opacity="0.9"
              maxWidth="600px"
            >
              Join thousands of readers tracking their journey, sharing reviews,
              and exploring new literary worlds together.
            </Text>
            <HStack gap="4" mt="4">
              <Button
                bg="brand.800"
                color="brand.100"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                variant="outline"
                onClick={() => navigate("/books")}
                size={{
                  base: "xs",
                  sm: "md",
                  md: "md",
                  lg: "lg",
                }}
                fontSize={{
                  base: "xs",
                  sm: "md",
                  md: "md",
                  lg: "xl",
                }}
              >
                <LuBook style={{ marginRight: "8px" }} />
                Explore Books
              </Button>
              <Button
                variant="solid"
                bg="brand.50"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                color="brand.600"
                onClick={() => navigate("/register")}
                size={{
                  base: "xs",
                  sm: "md",
                  md: "md",
                  lg: "lg",
                }}
                fontSize={{
                  base: "xs",
                  sm: "md",
                  md: "md",
                  lg: "xl",
                }}
              >
                Join Community
              </Button>
            </HStack>
          </VStack>
        </Container>
      </HeroSection>

      <Container maxWidth="1200px" py="8" alignContent="center">
        <VStack gap="12" mb="12">
          <VStack gap="4" align="start" width="100%">
            <Heading
              fontSize={{
                base: "lg",
                sm: "lg",
                md: "xl",
                lg: "xl",
              }}
              textAlign="left"
            >
              Why Book Lovers Choose Bookly
            </Heading>
            <Text
              color="fg.muted"
              maxWidth="600px"
              textAlign="left"
              fontSize={{
                base: "md",
                sm: "md",
                md: "lg",
                lg: "lg",
              }}
            >
              Everything you need to enhance your reading experience in one
              beautiful platform
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" width="100%">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack gap="6" mb="12" align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">
              <LuTrendingUp
                style={{ display: "inline", marginRight: "12px" }}
              />
              Trending Now
            </Heading>
            <Button
              variant="ghost"
              _hover={{
                boxShadow: "sm",
                borderColor: "brand.300",
              }}
              bg="brand.900"
              color="brand.100"
              onClick={() => navigate("/books")}
              size={{
                base: "xs",
                sm: "sm",
                md: "lg",
                lg: "lg",
              }}
            >
              View All
            </Button>
          </HStack>
          <BookGrid
            books={trendingBooksList}
            loading={loading}
            onBookSelect={handleBookSelect}
          />
        </VStack>

        <VStack gap="8" mb="12">
          <Heading size="xl" color="brand.50" textAlign="center">
            What Readers Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" width="100%">
            {userFeedback.map((feedback, index) => (
              <Blockquote.Root key={index}>
                <Card.Root bg="brand.700" variant="outline" height="100%">
                  <Card.Body bg="brand.500" borderRadius="20px">
                    <Blockquote.Content
                      as="div"
                      mb="4"
                      color="brand.900"
                      sx={{
                        fontWeight: "bold !important",
                        fontStyle: "normal",
                      }}
                    >
                      {feedback.quote}
                    </Blockquote.Content>
                    <Blockquote.Caption>
                      <Text fontWeight="semibold" color="primary.900">
                        {feedback.author}
                      </Text>
                      <Text fontSize="sm" color="primary.900">
                        {feedback.role}
                      </Text>
                    </Blockquote.Caption>
                  </Card.Body>
                </Card.Root>
              </Blockquote.Root>
            ))}
          </SimpleGrid>
        </VStack>

        <Stats />
      </Container>
    </Box>
  );
};

export default Home;
