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
  Input
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

  //Con nuevo hook useApi general
  //info libro
  const { data: book, loading: loadBook, error: bookErr } = useBooklyApi.useBook(id);

  //info reviews del libro
  const {
    data: reviews,
    loading: loadReview,
    error: reviewErr,
  } = useBooklyApi.useBookReviews(id);

  const handleSubmitReview = async () => {
    console.log("book id:", id,"review",newReview)

    //si no estas loggeado no puedes hacer review
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
              <Button colorPalette="purple">Add to Library</Button>
              <Button variant="outline">Add to TBR</Button>
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
                      By {authUser?.username} •{" "}
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
                  >
                    Submit Review
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      {/*Add Reivew*/}
      <Box></Box>
    </BookDetailContainer>
  );
};

export default BookDetail;
