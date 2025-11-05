import { useState, useCallback } from "react";
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
  Skeleton,
  SkeletonText,
  Spinner,
  Alert,
  Container,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth"; 
import { Tab } from "../styledComponents/Tab"; 
import coverPlaceholder from "../assets/images/placeholder-cover.jpg"

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

//skeletons de carga
const BookCoverSkeleton = () => (
  <Box flex="0 0 300px">
    <Skeleton height="400px" borderRadius="lg" mb="4" />
    <Skeleton height="4" width="80%" />
    <Skeleton height="3" width="60%" mt="2" />
  </Box>
);

const BookInfoSkeleton = () => (
  <Box flex="1">
    <VStack gap="4" align="start">
      <Skeleton height="8" width="80%" />
      <Skeleton height="6" width="60%" />
      <HStack>
        <Skeleton height="6" width="120px" />
        <Skeleton height="4" width="40px" />
      </HStack>
      <SkeletonText noOfLines={4} spacing="3" />
      <HStack gap="4" flexWrap="wrap">
        <Skeleton height="6" width="100px" />
        <Skeleton height="6" width="120px" />
        <Skeleton height="6" width="80px" />
      </HStack>
      <HStack gap="4">
        <Skeleton height="10" width="140px" />
        <Skeleton height="10" width="140px" />
        <Skeleton height="10" width="140px" />
      </HStack>
    </VStack>
  </Box>
);

const ReviewSkeleton = () => (
  <Card.Root width="100%">
    <Card.Body>
      <VStack gap="3" align="start">
        <HStack justify="space-between" width="100%">
          <Skeleton height="5" width="100%" />
          
        </HStack>
        <SkeletonText noOfLines={3} spacing="2" width="100%" />
        <Skeleton height="3" width="40%" />
      </VStack>
    </Card.Body>
  </Card.Root>
); 

const BookDetail = () => {
  //datos necesarios para post review
  const { id } = useParams();
  const { user: authUser, login } = useAuth();

  //info new review a enviar en post
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    title: "",
  });

  //para que por defecto aparezcan las reviews
  const [activeTab, setActiveTab] = useState("reviews");

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
    refetch: bookRefetch //para actualizar despues de subir la review
  } = useBooklyApi.useBook(id);

  //info reviews del libro
  const {
    data: reviews,
    loading: loadReview,
    error: reviewErr,
    refetch: reviewRefetch
  } = useBooklyApi.useBookReviews(id);

  const handleSubmitReview = useCallback(async () => {
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
      setActiveTab("reviews");
      //añadir refetch
      bookRefetch();
      reviewRefetch();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(`Error: ${err.message}`);
    }
  }, [authUser, id, bookRefetch, reviewRefetch]);

  const handleAddToLibrary = useCallback(async () => {
    if (!authUser) {
      alert("Please log in to add books to your library");
      return;
    }

    try {
      const result = await addToLibrary(authUser._id, id);

      if (result && result.user) {
        const token = localStorage.getItem("token");
        login(result.user, token); // Actualiza el contexto user
      }

      alert("Book added to your library!");
    } catch (err) {
      console.error("Error adding to library:", err);
      alert(`Error: ${err.message}`);
    }
  }, [authUser, id, addToLibrary, login]);

  const handleAddToTBR = useCallback(async () => {
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
  }, [authUser, id, addToTBR]);

  if (loadBook) {
    return (
      <BookDetailContainer>
        <HStack
          gap="8"
          align="start"
          flexDirection={{ base: "column", md: "row" }}
        >
          <BookCoverSkeleton/>
          <BookInfoSkeleton/>
        </HStack>

        <Box mt="8">
          <Tabs.Root>
              <ReviewSkeleton/>
          </Tabs.Root>
        </Box>
      </BookDetailContainer>
    );
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
            src={book.cover || coverPlaceholder}
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
                allowHalf
                readOnly
                count={5}
                value={book.rating}
                size="md"
                colorPalette="yellow"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text>({book.rating}/5)</Text>
            </HStack>

            <Text fontSize="lg" lineHeight="1.6" textAlign="left">
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

            <HStack gap="4" paddingTop="1.5rem">
              <Button
                bg="brand.800"
                color="brand.100"
                onClick={handleAddToLibrary}
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
              >
                Add to Library
              </Button>
              <Button
                bg="brand.800"
                color="brand.100"
                variant="outline"
                onClick={handleAddToTBR}
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
              >
                Add to TBR
              </Button>
            </HStack>
          </VStack>
        </Box>
      </HStack>

      <Box mt="8">
        <Tabs.Root
          value={activeTab}
          onValueChange={(e) => setActiveTab(e.value)}
        >
          <Tabs.List>
            <Tabs.Trigger
              value="reviews"
              bg="brand.900"
              _hover={{
                boxShadow: "xl",
                borderColor: "brand.300",
              }}
              _focus={{
                outline: "none !important",
              }}
            >
              Reviews ({reviews ? reviews.length : 0})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="add-review"
              bg="brand.900"
              _hover={{
                boxShadow: "xl",
                borderColor: "brand.300",
              }}
              _focus={{
                outline: "none !important",
                boxShadow: "none !important",
              }}
            >
              Review book
            </Tabs.Trigger>
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
              <Tab
                content={reviews}
                tabTitle="Reviews"
                contentType="reviews"
                context="bookDetail"
              />
            ) : (
              <Box textAlign="center" padding="8">
                <Text color="fg.muted">
                  No reviews yet. Be the first to review this book!
                </Text>
                {authUser && (
                  <Button
                    mt="4"
                    colorPalette="purple"
                    onClick={() => setActiveTab("add-review")}
                  >
                    Be the first to review!
                  </Button>
                )}
              </Box>
            )}
          </Tabs.Content>

          <Tabs.Content value="add-review">
            <Card.Root mt="4">
              <Card.Body bg="brand.900">
                <VStack gap="4">
                  <Field.Root>
                    <Field.Label>Review title</Field.Label>
                    <Input
                      placeholder="Title"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                      borderColor="brand.700"
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
                      borderColor="brand.700"
                    />
                  </Field.Root>

                  <Button
                    alignSelf="end"
                    colorPalette="purple"
                    onClick={handleSubmitReview}
                    loading={postingReview}
                    bg="brand.800"
                    color="brand.100"
                    variant="outline"
                    _hover={{
                      boxShadow: "sm",
                      borderColor: "brand.300",
                    }}
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
