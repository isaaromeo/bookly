import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  RatingGroup,
  Button,
  Input,
  Field,
  Tabs,
  Badge,
} from "@chakra-ui/react";
import styled from "styled-components";

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    title: "",
  });

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `https://bookly-back.onrender.com/api/books/${id}`
      );
      if (response.ok) {
        const bookData = await response.json();
        setBook(bookData);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://bookly-back.onrender.com/api/reviews/${id}`
      );
      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  if (!book) {
    return <div>Cargando...</div>;
  }

  return (
    <BookDetailContainer>
      <HStack
        gap="8"
        align="start"
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Portada del libro */}
        <Box flex="0 0 300px">
          <Box
            as="img"
            src={book.cover}
            alt={book.title}
            width="100%"
            borderRadius="lg"
            boxShadow="lg"
          />
        </Box>

        {/* Información del libro */}
        <Box flex="1">
          <VStack gap="4" align="start">
            <Text fontSize="3xl" fontWeight="bold">
              {book.title}
            </Text>
            <Text fontSize="xl" color="fg.muted">
              por {book.author}
            </Text>

            <HStack>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={book.rating}
                size="md"
                colorPalette="yellow"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text>({book.rating}/5)</Text>
            </HStack>

            <Text fontSize="lg" lineHeight="1.6">
              {book.sinopsis}
            </Text>

            <HStack gap="4" flexWrap="wrap">
              <Badge colorPalette="blue">
                <strong>Páginas:</strong> {book.pages}
              </Badge>
              <Badge colorPalette="green">
                <strong>Géneros:</strong> {book.genres?.join(", ")}
              </Badge>
              <Badge colorPalette="purple">
                <strong>ISBN:</strong> {book.isbn}
              </Badge>
            </HStack>

            <HStack gap="4">
              <Button colorPalette="purple">Añadir a Biblioteca</Button>
              <Button variant="outline">Añadir a Por Leer</Button>
              <Button variant="outline">Escribir Reseña</Button>
            </HStack>
          </VStack>
        </Box>
      </HStack>

      {/* Reseñas */}
      <Box mt="8">
        <Tabs.Root defaultValue="reviews">
          <Tabs.List>
            <Tabs.Trigger value="reviews">
              Reseñas ({reviews.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="add-review">Escribir Reseña</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="reviews">
            <VStack gap="4" mt="4">
              {reviews.map((review) => (
                <Card.Root key={review._id} width="100%">
                  <Card.Body>
                    <HStack justify="space-between" mb="2">
                      <Text fontWeight="semibold">{review.title}</Text>
                      <RatingGroup.Root
                        readOnly
                        count={5}
                        defaultValue={review.rating}
                        size="sm"
                        colorPalette="yellow"
                      >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                    </HStack>
                    <Text>{review.content}</Text>
                    <Text fontSize="sm" color="fg.muted" mt="2">
                      Por {review.user?.username} •{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="add-review">
            <Card.Root mt="4">
              <Card.Body>
                <VStack gap="4">
                  <Field.Root>
                    <Field.Label>Título de la reseña</Field.Label>
                    <Input
                      placeholder="Título de tu reseña"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Calificación</Field.Label>
                    <RatingGroup.Root
                      count={5}
                      value={newReview.rating}
                      onValueChange={(e) =>
                        setNewReview({ ...newReview, rating: e.value })
                      }
                      colorPalette="yellow"
                    >
                      <RatingGroup.HiddenInput />
                      <RatingGroup.Control />
                    </RatingGroup.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Reseña</Field.Label>
                    <Input
                      as="textarea"
                      rows={4}
                      placeholder="Escribe tu reseña aquí..."
                      value={newReview.content}
                      onChange={(e) =>
                        setNewReview({ ...newReview, content: e.target.value })
                      }
                    />
                  </Field.Root>

                  <Button alignSelf="end" colorPalette="purple">
                    Publicar Reseña
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </BookDetailContainer>
  );
};

export default BookDetail;
