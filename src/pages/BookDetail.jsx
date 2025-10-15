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
  Badge,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useBooklyApi } from "../hooks/useBooklyApi";

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BookDetail = () => {
  const { id } = useParams();
  // const [book, setBook] = useState(null);

  //Con nuevo hook useApi general
  const { data: book, loading, error } = useBooklyApi.useBook(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BookDetailContainer>
      <HStack
        gap="8"
        align="start"
        flexDirection={{ base: "column", md: "row" }}
      >
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

        <Box flex="1">
          <VStack gap="3" align="start">
            <Text fontSize="3xl" fontWeight="bold">
              {book.title}
            </Text>
            <Text fontSize="xl" color="fg.muted">
              by {book.author}
            </Text>

            <HStack>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={book.rating}
                size="md"
                colorPalette="yellow"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text>({book.rating}/5)</Text>
            </HStack>

            <Text fontSize="lg" lineHeight="1.6">
              {book.sinopsis}
            </Text>

            <HStack gap="4" flexWrap="wrap">
              <Badge colorPalette="blue">
                <strong>Pages:</strong> {book.pages}
              </Badge>
              <Badge colorPalette="green">
                <strong>Genres:</strong> {book.genres?.join(", ")}
              </Badge>
              <Badge colorPalette="purple">
                <strong>ISBN:</strong> {book.isbn}
              </Badge>
            </HStack>

            <HStack gap="4">
              <Button colorPalette="purple">Add to Library</Button>
              <Button variant="outline">Add to TBR</Button>
              <Button variant="outline">Review</Button>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </BookDetailContainer>
  );
};

export default BookDetail;
