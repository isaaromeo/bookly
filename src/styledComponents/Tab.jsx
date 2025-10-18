import {
  Box,
  Card,
  Text,
  Grid,
  VStack,
  HStack,
  RatingGroup,
  IconButton,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

export const Tab = ({ content, tabTitle, contentType }) => {

  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { likeReview } = useBooklyApi.useLikeReview();
  const [localReviews, setLocalReviews] = useState([]);//para poder ver el cambio del like irl

  useEffect(() => {
    if (content && contentType == "reviews") {
      setLocalReviews(content);
    }
  }, [content]);

  const handleLike = async (reviewId) => {
    if (!authUser) {
      alert("Please log in to like reviews");
      return;
    }

    try {
      const result = await likeReview(reviewId);

      //para que se vea el cambio de like en la interfaz irl
      setLocalReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: result.review.likes,
                likesCount: result.review.likes.length,
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const renderReviews = () => (
    <VStack gap="4" align="stretch">
      {localReviews.map((review) => {
        const isLikedByUser = authUser && review.likes?.includes(authUser._id);
        const likesCount = review.likes?.length || 0;
        return (
          <Card.Root key={review._id} width="100%">
            <Card.Body>
              <HStack justify="space-between" mb="2">
                <VStack align="start" gap="1">
                  <Text fontWeight="semibold">{review.title}</Text>
                  <Text fontSize="sm" color="fg.muted">
                    on {review.book?.title || "Unknown Book"}
                  </Text>
                </VStack>
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
              <HStack justify="space-between" align="center">
                <Text fontSize="sm" color="fg.muted" mt="2">
                  By {review.user?.username} •{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
                <HStack gap="2">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorPalette={isLikedByUser ? "red" : "gray"}
                    onClick={() => handleLike(review._id)}
                  >
                    {isLikedByUser ? <FaHeart /> : <FaRegHeart />}
                  </IconButton>
                  <Text fontSize="sm" color="fg.muted">
                    {likesCount} {likesCount === 1 ? "like" : "likes"}
                  </Text>
                </HStack>
              </HStack>
            </Card.Body>
          </Card.Root>
        );
        
      })}
    </VStack>
  );

  const renderBooks = () => (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
      {content.map((book) => (
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
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Text fontWeight="bold" mt="2">
              {book.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.author}
            </Text>
            {book.rating && (
              <HStack mt="1">
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
                <Text fontSize="xs" color="fg.muted">
                  ({book.rating})
                </Text>
              </HStack>
            )}
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );

  const renderEmpty = () => (
    <Text color="gray.500">
      There are no elements added to your {tabTitle}.
    </Text>
  );

    return (
      <Box>
        <Text fontSize="xl" mb="4">
          {tabTitle} ({content ? content.length : 0})
        </Text>

        {contentType === "books" && renderBooks()}
        {contentType === "reviews" && renderReviews()}
        {contentType === "empty" && renderEmpty()}
      </Box>
    );
}

export default Tab;