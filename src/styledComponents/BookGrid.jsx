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
    <Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap="4">
      {memoizedBooks.map((book) => (
        <Card.Root
          key={book._id}
          cursor="pointer"
          onClick={() =>
            onBookSelect ? onBookSelect(book) : navigate(`/books/${book._id}`)
          }
          // height="100%"
          // variant="outline"
          maxWidth="250px"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "xl",
            borderColor: "brand.200",
          }}
          transition="all 0.3s ease-in-out"
          bg="brand.800"
        >
          <Card.Body>
            <Box
              as="img"
              src={book.cover || coverPlaceholder}
              alt={book.title}
              width="100%"
              height="270px"
              objectFit="cover"
              borderRadius="8px"
              mb="4"
            />

            <VStack align="start" gap="2">
              <Text fontWeight="bold" fontSize="lg" lineClamp="2" height="3rem">
                {book.title}
              </Text>

              <Text color="fg.muted" fontSize="md" lineClamp="1">
                {book.author}
              </Text>

              <HStack gap="2" width="100%">
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
