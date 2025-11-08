// src/styledComponents/BookGrid.jsx - Mejorado
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  Text,
  VStack,
  HStack,
  RatingGroup,
  Skeleton,
} from "@chakra-ui/react";
import coverPlaceholder from "../assets/images/placeholder-cover.jpg";

export const BookGrid = ({
  books,
  loading = false,
  onBookSelect,
  emptyMessage = "No books found",

}) => {
  const navigate = useNavigate();
  const memoizedBooks = useMemo(() => books || [], [books]);

  if (loading) {
    return (
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
        {[...Array(8)].map((_, i) => (
          <Card.Root key={i}>
            <Card.Body>
              <Skeleton height="300px" borderRadius="8px" mb="4" />
              <Skeleton height="4" mb="2" width="80%" />
              <Skeleton height="3" mb="3" width="60%" />
              <Skeleton height="3" width="90%" />
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    );
  }

  if (!memoizedBooks.length) {
    return (
      <Box textAlign="center" py="12">
        <Text fontSize="lg" color="fg.muted">
          {emptyMessage}
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)", // ← 2 columnas en móvil
        sm: "repeat(3, 1fr)", // ← 3 columnas en sm
        md: "repeat(3, 1fr)", // ← 4 columnas en md
        lg: "repeat(auto-fit, minmax(200px, 1fr))", // ← Auto en pantallas grandes
      }}
      gap="4"
      justifyItems="center"
      width="100%"
    >
      {memoizedBooks.map((book) => (
        <Card.Root
          key={book._id}
          cursor="pointer"
          onClick={() =>
            onBookSelect ? onBookSelect(book) : navigate(`/books/${book._id}`)
          }
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "xl",
            borderColor: "brand.200",
          }}
          transition="all 0.3s ease-in-out"
          bg="brand.800"
          width="90%"
          maxWidth={{
            // ← Limita el ancho máximo
            base: "180px",
            sm: "160px",
            md: "200px",
            lg: "250px",
          }}
        >
          <Card.Body
            padding={{ base: "2", md: "3" }}
            display="flex"
            flexDirection="column"
            height="100%"
          
          >
            <Box
              as="img"
              src={book.cover || coverPlaceholder}
              alt={book.title}
              width="100%"
              height={{
                base: "150px",
                sm: "150px",
                md: "250px",
                lg: "250px",
              }}
              objectFit="cover"
              borderRadius="8px"
              mb="4"
            />

            <VStack align="start" gap="2">
              <Text
                fontWeight="bold"
                fontSize={{
                  base: "1rem",
                  sm: "md",
                  md: "lg",
                  lg: "lg",
                }}
                lineClamp="2"
              >
                {book.title}
              </Text>

              <Text
                color="fg.muted"
                fontSize={{
                  base: "xs",
                  sm: "xs",
                  md: "md",
                  lg: "md",
                }}
                lineClamp="1"
              >
                {book.author}
              </Text>

              <HStack gap="2" width="100%">
                <RatingGroup.Root
                  readOnly
                  count={5}
                  defaultValue={book.rating}
                  size={{
                    base: "xs",
                    sm: "xs",
                    md: "sm",
                    lg: "sm",
                  }}
                  colorPalette="yellow"
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
                <Text fontSize="sm" color="fg.muted">
                  ({book.rating}/5)
                </Text>
              </HStack>

              {book.genres && book.genres.length > 0 && (
                <Text
                  fontSize="sm"
                  color="fg.subtle"
                  lineClamp="2"
                  height="2.5rem"
                >
                  {book.genres.join(", ")}
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );
};

export default BookGrid;
