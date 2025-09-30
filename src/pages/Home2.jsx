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
  const navigate = useNavigate();

  const featuredBooks = books.slice(0, 6);
  const recentBooks = books.slice(-4);

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Text fontSize="4xl" fontWeight="bold" color="white" mb="4">
          Descubre tu próxima lectura favorita
        </Text>
        <Text fontSize="xl" color="white" mb="6" opacity="0.9">
          Comparte reseñas, encuentra recomendaciones y conecta con otros
          lectores
        </Text>
        <Button size="lg" colorPalette="purple">
          Explorar Libros
        </Button>
      </HeroSection>

      {/* Libros Destacados */}
      <VStack gap="6" align="stretch" mb="8">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            Libros Destacados
          </Text>
          <Button variant="ghost" onClick={() => navigate("/books")}>
            Ver todos
          </Button>
        </HStack>

        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
          {featuredBooks.map((book) => (
            <Card.Root
              key={book._id}
              cursor="pointer"
              onClick={() => navigate(`/books/${book._id}`)}
            >
              <Card.Body>
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <Text fontWeight="bold" fontSize="lg">
                  {book.title}
                </Text>
                <Text color="gray.500" mb="2">
                  {book.author}
                </Text>
                <RatingGroup.Root
                  readOnly
                  count={5}
                  defaultValue={book.rating}
                  size="sm"
                  colorPalette="yellow"
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
                <Text fontSize="sm" color="gray.500" mt="2">
                  {book.genres?.join(", ")}
                </Text>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>
      </VStack>

      {/* Estadísticas */}
      <Grid templateColumns="repeat(3, 1fr)" gap="6" mb="8">
        <Card.Root>
          <Card.Body textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              {books.length}+
            </Text>
            <Text>Libros en nuestra base</Text>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              100+
            </Text>
            <Text>Reseñas de usuarios</Text>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              50+
            </Text>
            <Text>Lectores activos</Text>
          </Card.Body>
        </Card.Root>
      </Grid>
    </Box>
  );
};

export default Home;
