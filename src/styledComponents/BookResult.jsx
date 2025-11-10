
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
    Portal,
  } from "@chakra-ui/react";

export const BookResult = ({books, isLoading}) => {
    const navigate = useNavigate();

  return (

          <Card.Root
            position="absolute"
            top="100%"
            left="0"
            right="0"
            marginTop="1"
            zIndex="dropdown"
            maxHeight="400px"
            overflowY="auto"
          >
            <Card.Body padding="0">
              {isLoading ? (
                <Box padding="4">
                    <Text color="fg.subtle">Loanding results...</Text>
                </Box>
              ) : books.length > 0 ? (
                <VStack gap="6" align="stretch" mb="8">
                        <HStack justify="space-between">
                          <Text fontSize="2xl" fontWeight="bold">
                            Results
                          </Text>
                          <Button variant="ghost" onClick={() => navigate("/books")}>
                            View more
                          </Button>
                        </HStack>
                
                        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
                          {books.map((book) => (
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
              ) : (
                <Box padding="4">
                  <Text textAlign="center" color="fg.muted">
                    No se encontraron libros
                  </Text>
                </Box>
              )}
            </Card.Body>
          </Card.Root>
      )}

export default BookResult;
