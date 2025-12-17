import { useState, useCallback, useEffect } from "react";
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
} from "@chakra-ui/react";
import styled from "styled-components";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { Tab } from "../styledComponents/Tab";
import coverPlaceholder from "../assets/images/placeholder-cover.jpg";
import { toaster } from "../components/ui/toaster";
import { FaBook, FaBookmark } from "react-icons/fa";

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "820px"}) {
    margin: 0;
    padding: 0.5rem;
  }
`;

// Skeletons de carga actualizados para Flexbox
const BookCoverSkeleton = () => (
  <Box
    width={{
      base: "100%",
      sm: "250px",
      md: "300px",
      lg: "350px",
    }}
    flexShrink={0}
  >
    <Skeleton
      height={{ base: "300px", sm: "350px", md: "400px" }}
      borderRadius="lg"
      mb="4"
      bg="brand.800"
    />
    <Skeleton height="4" width="80%" bg="brand.700" />
    <Skeleton height="3" width="60%" mt="2" bg="brand.700" />
  </Box>
);

const BookInfoSkeleton = () => (
  <Box flex="1">
    <VStack gap="4" align="start">
      <Skeleton
        height={{ base: "6", sm: "7", md: "8" }}
        width="80%"
        bg="brand.800"
      />
      <Skeleton
        height={{ base: "5", sm: "6", md: "6" }}
        width="60%"
        bg="muted.300"
      />
      <HStack>
        <Skeleton
          height={{ base: "5", sm: "6", md: "6" }}
          width="120px"
          bg="brand.600"
        />
        <Skeleton
          height={{ base: "4", sm: "4", md: "4" }}
          width="40px"
          bg="brand.600"
        />
      </HStack>
      <Card.Root width="100%" borderColor="brand.900">
        <Card.Body bg="brand.900">
          <VStack gap="3" align="start">
            <HStack justify="space-between" width="100%">
              <Skeleton height="5" width="100%" bg="brand.700" />
            </HStack>
            <SkeletonText
              noOfLines={3}
              spacing="2"
              width="100%"
              bg="muted.300"
            />
            <Skeleton height="3" width="40%" bg="brand.700" />
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  </Box>
);

const ReviewSkeleton = () => (
  <Card.Root width="100%" borderColor="brand.900">
    <Card.Body bg="brand.900">
      <VStack gap="3" align="start">
        <HStack justify="space-between" width="100%">
          <Skeleton height="5" width="100%" bg="brand.700" />
        </HStack>
        <SkeletonText noOfLines={3} spacing="2" width="100%" bg="muted.300" />
        <Skeleton height="3" width="40%" bg="brand.700" />
      </VStack>
    </Card.Body>
  </Card.Root>
);

const BookDetail = () => {
  const { id } = useParams();
  const { user: authUser, login, updateUser } = useAuth();

  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    title: "",
  });
 
  const [activeTab, setActiveTab] = useState("reviews");
  const [isSinopsisExpanded, setIsSinopsisExpanded] = useState(false);

  const {
    postReview,
    loading: postingReview,
    error: postError,
  } = useBooklyApi.usePostReview();

  const { addToLibrary, loading: addingToLibrary } =
    useBooklyApi.useAddToLibrary();
  const { addToTBR, loading: addingToTBR } = useBooklyApi.useAddToTBR();

  const {
    data: book,
    loading: loadBook,
    error: bookErr,
    refetch: bookRefetch,
  } = useBooklyApi.useBook(id);

  const {
    data: reviews,
    loading: loadReview,
    error: reviewErr,
    refetch: reviewRefetch,
  } = useBooklyApi.useBookReviews(id);

  const isLongSinopsis = book?.sinopsis && book.sinopsis.length > 80;
  const getSinopsisText = () => {
    if (!book?.sinopsis) return "";

    if (isSinopsisExpanded || !isLongSinopsis) {
      return book.sinopsis;
    }

    return book.sinopsis.slice(0, 200) + "...";
  };

  const [isInLibrary, setIsInLibrary] = useState(false);
  const [isInTBR, setIsInTBR] = useState(false);

  useEffect(() => {
  if (authUser && book) {
    const inLibrary = authUser.library?.some(
      libBook => libBook._id === book._id || libBook === book._id
    );
    const inTBR = authUser.tbr?.some(
      tbrBook => tbrBook._id === book._id || tbrBook === book._id
    );
    
    setIsInLibrary(!!inLibrary);
    setIsInTBR(!!inTBR);
  }
}, [authUser, book]);

  const handleSubmitReview = useCallback(async () => {
    if (!authUser) {
      toaster.create({
        title: "Authentication Required",
        description: "Please log in to submit a review",
        type: "error",
      });
      return;
    }

    if (!newReview.title.trim() || !newReview.content.trim()) {
      toaster.create({
        title: "Missing Information",
        description: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    try {
      await postReview(id, newReview, authUser._id);
      setNewReview({ rating: 5, content: "", title: "" });

      toaster.create({
        title: "Review Submitted!",
        description: "Your review has been published successfully",
        type: "success",
      });
      setActiveTab("reviews");

      bookRefetch();
      reviewRefetch();
    } catch (err) {
      toaster.create({
        title: "Submission Failed",
        description:
          err.message || "Error submitting review. Please try again.",
        type: "error",
      });
    }
  }, [authUser, id, bookRefetch, reviewRefetch]);

  const handleAddToLibrary = useCallback(async () => {
    if (!authUser) {
      toaster.create({
        title: "Authentication Required",
        description: "Please log in to add books to your library",
        type: "error",
      });
      return;
    }

    try {
      const result = await addToLibrary(authUser._id, id);
      console.log("Toggle library result:", result);

      if (result && result.user) {
        console.log("Updated user from result:", result.user);

        //actualiza el contexto de autenticación
        updateUser(result.user);

        //actauliza localStorage
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        //actualiza estado local
        setIsInLibrary(result.isInLibrary || result.isInLibrary === undefined);

        //si se añade a library, quitar de TBR
        if (result.isInLibrary) {
          setIsInTBR(false);
        }

        console.log(
          "New states: isInLibrary=",
          result.isInLibrary,
          "isInTBR=",
          result.isInTBR || false
        );
      }

      toaster.create({
        title: result.isInLibrary
          ? "Added to Library!"
          : "Removed from Library",
        description:
          result.message ||
          (result.isInLibrary
            ? "Book added to your library!"
            : "Book removed from your library"),
        type: "success",
      });
    } catch (err) {
      console.error("Error toggling library:", err);
      toaster.create({
        title: "Error",
        description: err.message || "Error managing your library",
        type: "error",
      });
    }
  }, [authUser, id, addToLibrary, updateUser]);

  const handleAddToTBR = useCallback(async () => {
    if (!authUser) {
      toaster.create({
        title: "Authentication Required",
        description: "Please log in to add books to your TBR",
        type: "error",
      });
      return;
    }

    try {
      const result = await addToTBR(authUser._id, id);

      if (result && result.user) {
        //actualiza el contexto de autenticación
        updateUser(result.user);

        //actualiza localStorage
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        //actualiza estado local
        setIsInTBR(result.isInTBR || result.isInTBR === undefined);
      }

      toaster.create({
        title: result.isInTBR ? "Added to TBR!" : "Removed from TBR",
        description:
          result.message ||
          (result.isInTBR
            ? "Book added to your TBR!"
            : "Book removed from your TBR"),
        type: "success",
      });
    } catch (err) {
      console.error("Error toggling TBR:", err);
      toaster.create({
        title: "Error",
        description: err.message || "Error managing your TBR",
        type: "error",
      });
    }
  }, [authUser, id, addToTBR, updateUser]);

  if (loadBook) {
    return (
      <BookDetailContainer>
        <Stack
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 6, sm: 6, md: 8 }}
          align="start"
          mb={8}
        >
          <BookCoverSkeleton />
          <BookInfoSkeleton />
        </Stack>

        <Box mt="8">
          <Tabs.Root>
            <ReviewSkeleton />
          </Tabs.Root>
        </Box>
      </BookDetailContainer>
    );
  }

  return (
    <BookDetailContainer>
      <Stack
        direction={{
          base: "column", // 0px - 767px
          md: "row", // 768px+
        }}
        gap={{
          base: 6,
          md: 8,
        }}
        align="start"
        mb={8}
        className="custom-book-stack"
      >
        <Box
          width={{
            base: "100%",
            // customCol: "100%",
            // tableMid: "50%",
            sm: "50%",
            md: "50%",
            lg: "50%",
          }}
          flexShrink={0}
          className="book-image-container"
        >
          <Box
            as="img"
            src={book.cover || coverPlaceholder}
            alt={book.title}
            width="100%"
            height="auto"
            borderRadius="lg"
            boxShadow="xl"
            objectFit="cover"
          />
          <HStack
            display={{
              base: "none",
              sm: "flex",
              md: "flex",
              lg: "none",
            }}
            gap="4"
            paddingTop="1.5rem"
            flexWrap="wrap"
            justifyContent="center"
          >
            <Button
              bg={isInLibrary ? "secondary.900" : "brand.800"}
              color={isInLibrary ? "secondary.100" : "brand.100"}
              onClick={handleAddToLibrary}
              _hover={{
                boxShadow: "sm",
                borderColor: isInLibrary ? "secondary.300" : "brand.300",
              }}
              size={{ base: "sm", sm: "sm", md: "sm", lg: "md" }}
              width={{ base: "100%", sm: "auto" }}
              maxWidth={{
                base: "16px",
                sm: "140px",
                md: "150px",
                lg: "170px",
              }}
            >
              <Box
                as={FaBook}
                width={{
                  base: "14px",
                  sm: "16px",
                  md: "16px",
                  lg: "20px",
                }}
                height={{
                  base: "14px",
                  sm: "16px",
                  md: "16px",
                  lg: "20px",
                }}
              />
              <Text
                display={{
                  base: "none",
                  sm: "block",
                  md: "block",
                  lg: "block",
                }}
              >
                {isInLibrary ? "In Library" : "Add to Library"}
              </Text>
            </Button>
            <Button
              display={isInLibrary ? "none" : "flex"}
              bg={isInTBR ? "primary.900" : "brand.800"}
              color={isInTBR ? "primary.100" : "brand.100"}
              variant="outline"
              onClick={handleAddToTBR}
              _hover={{
                boxShadow: "sm",
                borderColor: isInTBR ? "primary.300" : "brand.300",
              }}
              size={{ base: "sm", sm: "sm", md: "sm", lg: "md" }}
              width={{ base: "100%", sm: "auto" }}
              maxWidth={{
                base: "16px",
                sm: "120px",
                md: "150px",
                lg: "150px",
              }}
            >
              <Box
                as={FaBookmark}
                width={{
                  base: "14px",
                  sm: "16px",
                  md: "16px",
                  lg: "20px",
                }}
                height={{
                  base: "14px",
                  sm: "16px",
                  md: "16px",
                  lg: "20px",
                }}
              />
              <Text
                display={{
                  base: "none",
                  sm: "block",
                  md: "block",
                  lg: "block",
                }}
              >
                {isInTBR ? "In TBR" : "Add to TBR"}
              </Text>
            </Button>
          </HStack>
        </Box>

        <Box flex="1">
          <VStack gap={{ base: 3, md: 4 }} align="start">
            <Text
              fontSize={{ base: "xl", sm: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              color="brand.50"
              textShadow="0 3px 4px rgba(65, 45, 75, 0.93)"
              textAlign="left"
            >
              {book.title}
            </Text>

            <Text
              fontSize={{
                base: "md",
                sm: "xs",
                md: "md",
                lg: "md",
              }}
              color="muted.100"
              textAlign="left"
            >
              by {book.author}
            </Text>

            <HStack gap="3" flexWrap="wrap" align="center">
              <RatingGroup.Root
                allowHalf
                readOnly
                count={5}
                value={book.rating}
                size={{
                  base: "xs",
                  sm: "xs",
                  md: "md",
                  lg: "md",
                }}
                colorPalette="yellow"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "md",
                  lg: "md",
                }}
                color="muted.200"
              >
                ({book.rating}/5)
              </Text>
            </HStack>

            <Text
              fontSize={{
                base: "md",
                sm: "sm",
                md: "lg",
                lg: "lg",
              }}
              display={{
                base: "block",
                sm: "none",
                md: "none",
                lg: "block",
              }}
              lineHeight="1.6"
              textAlign="left"
              color="muted.200"
            >
              {book.sinopsis}
            </Text>
            <Box
              width="100%"
              textAlign="left"
              flexDirection="column"
              alignItems="flex-start"
              display={{
                base: "none",
                sm: "flex",
                md: "flex",
                lg: "none",
              }}
            >
              <Text
                fontSize={{
                  base: "md",
                  sm: "sm",
                  md: "lg",
                  lg: "lg",
                }}
                lineHeight="1.6"
                textAlign="left"
                color="muted.200"
                mb={isLongSinopsis ? 2 : 0}
              >
                {getSinopsisText()}
              </Text>

              {isLongSinopsis && (
                <Button
                  variant="ghost"
                  bg="transparent"
                  size="sm"
                  color="brand.100"
                  border="transparent"
                  onClick={() => setIsSinopsisExpanded(!isSinopsisExpanded)}
                  _focus={{ outline: "none !important" }}
                  padding="0"
                  cursor="pointer"
                  height="auto"
                  fontWeight="normal"
                  textDecoration="underline"
                  alignSelf="start"
                >
                  {isSinopsisExpanded ? "Read Less" : "Read More"}
                </Button>
              )}
            </Box>
            {!isSinopsisExpanded && (
              <Stack
                direction={{ base: "row", sm: "row" }}
                gap="3"
                flexWrap="wrap"
              >
                <Badge
                  colorPalette="blue"
                  size={{ base: "sm", md: "md" }}
                  whiteSpace="nowrap"
                  width="auto"
                >
                  <strong>Pages:</strong> {book.pages}
                </Badge>
                <Badge
                  colorPalette="green"
                  size={{ base: "sm", md: "md" }}
                  maxWidth="100%"
                >
                  <strong>Genres:</strong> {book.genres?.slice(0, 2).join(", ")}
                  {book.genres?.length > 2 && "..."}
                </Badge>
                <Badge
                  colorPalette="purple"
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
                >
                  <strong>ISBN:</strong> {book.isbn}
                </Badge>
              </Stack>
            )}

            <HStack
              display={{
                base: "flex",
                sm: "none",
                md: "none",
                lg: "flex",
              }}
              gap="4"
              paddingTop="1.5rem"
            >
              <Button
                bg={isInLibrary ? "secondary.900" : "brand.800"}
                color={isInLibrary ? "secondary.100" : "brand.100"}
                onClick={handleAddToLibrary}
                _hover={{
                  boxShadow: "sm",
                  borderColor: isInLibrary ? "secondary.300" : "brand.300",
                }}
                size={{ base: "sm", sm: "sm", md: "sm", lg: "md" }}
                width={{ base: "100%", sm: "auto" }}
                maxWidth={{
                  base: "140px",
                  sm: "140px",
                  md: "150px",
                  lg: "170px",
                }}
              >
                <Box
                  as={FaBook}
                  width={{
                    base: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "20px",
                  }}
                  height={{
                    base: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "20px",
                  }}
                  mr={{ base: 0, sm: 0, md: 2, lg: 2 }}
                />
                <Text
                  display={{
                    base: "block",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  }}
                  fontSize={{
                    base: "sm",
                    sm: "sm",
                    md: "md",
                    lg: "lg",
                  }}
                >
                  {isInLibrary ? "In Library" : "Add to Library"}
                </Text>
              </Button>
              <Button
                display={isInLibrary ? "none" : "flex"}
                bg={isInTBR ? "primary.900" : "brand.800"}
                color={isInTBR ? "primary.100" : "brand.100"}
                variant="outline"
                onClick={handleAddToTBR}
                _hover={{
                  boxShadow: "sm",
                  borderColor: isInTBR ? "primary.300" : "brand.300",
                }}
                size={{ base: "sm", sm: "sm", md: "sm", lg: "md" }}
                width={{ base: "100%", sm: "auto" }}
                maxWidth={{
                  base: "140px",
                  sm: "140px",
                  md: "150px",
                  lg: "150px",
                }}
              >
                <Box
                  as={FaBookmark}
                  width={{
                    base: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "20px",
                  }}
                  height={{
                    base: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "20px",
                  }}
                  mr={{ base: 0, sm: 0, md: 2, lg: 2 }}
                />
                <Text
                  display={{
                    base: "block",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  }}
                  fontSize={{
                    base: "sm",
                    sm: "sm",
                    md: "md",
                    lg: "lg",
                  }}
                >
                  {isInTBR ? "In TBR" : "Add to TBR"}
                </Text>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Stack>

      <Box mt="8">
        <Tabs.Root
          value={activeTab}
          onValueChange={(e) => setActiveTab(e.value)}
          gap={2}
        >
          <Tabs.List gap={2} borderBottom="1px solid" borderColor="brand.800">
            <Tabs.Trigger
              value="reviews"
              bg="brand.900"
              _hover={{
                boxShadow: "xl",
                borderColor: "brand.300",
              }}
              _focus={{
                outline: "none !important",
                borderColor: "brand.300",
                color: "muted.200",
              }}
              _selected={{
                color: "brand.50",
                borderColor: "muted.300",
              }}
              color="muted.100"
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
                borderColor: "brand.300",
                color: "muted.200",
              }}
              _selected={{
                color: "brand.50",
                borderColor: "muted.300",
              }}
              color="muted.100"
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
                <Text color="muted.100">No reviews yet.</Text>
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
            <Card.Root mt="4" borderColor="brand.600" bg="brand.900">
              <Card.Body bg="brand.900" borderRadius="10px">
                <VStack gap="4">
                  <Field.Root>
                    <Field.Label color="muted.200">Review title</Field.Label>
                    <Input
                      placeholder="Title"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                      borderColor="brand.700"
                      color="muted.100"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label color="muted.200">Rating</Field.Label>
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
                    <Field.Label color="muted.200">Review</Field.Label>
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
                      color="muted.100"
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
