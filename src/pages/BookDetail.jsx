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
  Tabs,
  Field,
  Input,
  Spinner
} from "@chakra-ui/react";
import styled from "styled-components";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth"; 

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BookDetail = () => {
  //datos necesarios para post review
  const { id } = useParams();
  const { user: authUser } = useAuth();

  //info new review a enviar en post
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    title: "",
  });

  //hook para post review
  const {
    postReview,
    loading: postingReview,
    error: postError,
  } = useBooklyApi.usePostReview();

  //hook para add to library y tbr
  const { addToLibrary, loading: addingToLibrary } =
    useBooklyApi.useAddToLibrary();
  const { addToTBR, loading: addingToTBR } = useBooklyApi.useAddToTBR();

  //Con nuevo hook useApi general
  //info libro
  const {
    data: book,
    loading: loadBook,
    error: bookErr,
  } = useBooklyApi.useBook(id);

  //info reviews del libro
  const {
    data: reviews,
    loading: loadReview,
    error: reviewErr,
  } = useBooklyApi.useBookReviews(id);

  const handleSubmitReview = async () => {
    console.log("book id:", id, "review", newReview);

    //si no estas loggeado no puedes hacer review
    //añadir que un user no puede reseñar el mismo libro 2 veces
    if (!authUser) {
      alert("Please log in to submit a review");
      return;
    }

    try {
      await postReview(id, newReview, authUser._id);
      setNewReview({ rating: 5, content: "", title: "" });
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleAddToLibrary = async () => {
  if (!authUser) {
    alert("Please log in to add books to your library");
    return;
  }

  const bookIdStr = JSON.stringify(id);
  
  try {
    await addToLibrary(authUser, bookIdStr);
    alert("Book added to your library!");
  } catch (err) {
    console.error("Error adding to library:", err);
    alert(`Error: ${err.message}`);
  }
};
  const handleAddToTBR = async () => {
    if (!authUser) {
      alert("Please log in to add books to your TBR");
      return;
    }

    try {
      await addToTBR(authUser._id, id);
      alert("Book added to your TBR!");
    } catch (err) {
      console.error("Error adding to TBR:", err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loadBook) {
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
              <Button colorPalette="purple" onClick={handleAddToLibrary}>
                Add to Library
              </Button>
              <Button variant="outline" onClick={handleAddToTBR}>
                Add to TBR
              </Button>
              <Button variant="outline">Review</Button>
            </HStack>
          </VStack>
        </Box>
      </HStack>
      {/* Reviews */}

      <Box mt="8">
        <Tabs.Root defaultValue="reviews">
          <Tabs.List>
            <Tabs.Trigger value="reviews">
              Reviews ({reviews ? reviews.length : 0})
            </Tabs.Trigger>
            <Tabs.Trigger value="add-review">Review book</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="reviews">
            {loadReview ? (
              <Box display="flex" justifyContent="center" padding="8">
                <Spinner size="lg" />
              </Box>
            ) : reviewErr ? (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>Error loading reviews: {reviewErr}</Alert.Title>
              </Alert.Root>
            ) : reviews && reviews.length > 0 ? (
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
                        By {review.user?.username} •{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </VStack>
            ) : (
      
              <Box textAlign="center" padding="8">
                <Text color="fg.muted">
                  No reviews yet. Be the first to review this book!
                </Text>
              </Box>
            )}
          </Tabs.Content>

          <Tabs.Content value="add-review">
            <Card.Root mt="4">
              <Card.Body>
                <VStack gap="4">
                  <Field.Root>
                    <Field.Label>Review title</Field.Label>
                    <Input
                      placeholder="Title"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Rating</Field.Label>
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
                    <Field.Label>Review</Field.Label>
                    <Input
                      as="textarea"
                      rows={4}
                      placeholder="Write your thoughts on this book..."
                      value={newReview.content}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          content: e.target.value,
                        })
                      }
                    />
                  </Field.Root>

                  <Button
                    alignSelf="end"
                    colorPalette="purple"
                    onClick={handleSubmitReview}
                    loading={postingReview}
                  >
                    Submit Review
                  </Button>

                  {postError && (
                    <Alert.Root status="error">
                      <Alert.Indicator />
                      <Alert.Title>{postError}</Alert.Title>
                    </Alert.Root>
                  )}
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
