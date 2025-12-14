import {
  Box,
  Card,
  Text,
  Grid,
  VStack,
  HStack,
  RatingGroup,
  IconButton,
  Avatar,
  Button
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaUserPlus, FaUserCheck, FaTrash } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect, useCallback } from "react";
import BookGrid from "../styledComponents/BookGrid";
import { toaster } from "../components/ui/toaster";


export const Tab = ({ content, tabTitle, contentType, context = "profile" }) => {
  const navigate = useNavigate();
  const { user: authUser, login } = useAuth();
  const { likeReview } = useBooklyApi.useLikeReview();
  const { followUser } = useBooklyApi.useFollowUser();
  const [localContent, setLocalContent] = useState([]); //para poder ver el cambio del like irl
  const { deleteReview, loading: deletingReview } =
    useBooklyApi.useDeleteReview();

  useEffect(() => {
    if (content) {
      setLocalContent([...content]);
    }
  }, [content]);

  const handleLike = useCallback(
    async (reviewId) => {
      if (!authUser) {
        
        toaster.create({
          title: "Authentication Required",
          description: "Please log in to like reviews",
          type: "error",
        });
        return;
      }

      try {
        const result = await likeReview(reviewId);

        setLocalContent((prevContent) =>
          prevContent.map((review) =>
            review._id === reviewId ? result.review : review
          )
        );
      } catch (error) {
        console.error("Error liking review:", error);
      }
    },
    [authUser, likeReview]);

  const handleFollow = useCallback(
    async (userId) => {
      if (!authUser) {
        
        toaster.create({
          title: "Authentication Required",
          description: "Please log in to follow users",
          type: "error",
        });
        return;
      }

      try {
        const result = await followUser(userId);

        if (result && result.user) {
          console.log("user followed succesfully");
          const token = localStorage.getItem("token");
          //actualizar contexto
          login(result.user, token);
          //actualiza estado local para reflejar cambio
          setLocalContent((prevContent) =>
            prevContent.map((user) =>
              user._id === userId
                ? {
                    ...user,
                    followers: result.user.followers?.includes(userId)
                      ? [...(user.followers || []), authUser._id]
                      : user.followers?.filter((id) => id !== authUser._id),
                  }
                : user
            )
          );
        }
      } catch (error) {
        toaster.create({
          title: "Error following user",
          description: `Error: ${error}`,
          type: "error",
        });
        console.error("Error following user:", error);
      }
    },
    [authUser, followUser, login]);

  const handleUserClick = useCallback(
    (userId) => {
      navigate(`/profile/${userId}`);
    },[navigate]);


  const getIsFollowing = useCallback(
    (userId) => {
      if (!authUser || !authUser.following) return false;
      if (
        authUser.following.length > 0 &&
        typeof authUser.following[0] === "string"
      ) {
        return authUser.following.includes(userId);
      }
      if (
        authUser.following.length > 0 &&
        typeof authUser.following[0] === "object"
      ) {
        return authUser.following.some(
          (followedUser) => followedUser && followedUser._id === userId
        );
      }

      return false;
    }, [authUser]);

    const handleDeleteReview = useCallback(
      async (reviewId) => {
        if (!authUser) {
          toaster.create({
            title: "Authentication Required",
            description: "Please log in delete review",
            type: "error",
          });
          return;
        }

        if (!window.confirm("Are you sure you want to delete this review?")) {
          return;
        }

        try {
          await deleteReview(reviewId, authUser._id);

          setLocalContent((prevContent) =>
            prevContent.filter((review) => review._id !== reviewId)
          );

          alert("Review deleted successfully!");
          toaster.create({
            title: "Success!",
            description: "Review deleted successfully!",
            type: "success",
          });
        } catch (error) {
          console.error("Error deleting review:", error);
          toaster.create({
            title: "Error deleting review",
            description: `Error: ${error}`,
            type: "error",
          });
        }
      },
      [authUser, deleteReview]
    );


    const getReviewUserId = (review) => {
      if (!review || !review.user) return null;

      if (typeof review.user === "object" && review.user._id) {
        return review.user._id;
      }
      if (typeof review.user === "string") {
        return review.user;
      }
      return null;
    };


  const renderReviews = () => {
    if(!localContent || localContent.length === 0){
      return (
            <Box textAlign="center" py="12">
              <Text fontSize="lg" color="muted.100">
                No reviews found
              </Text>
            </Box>
          );
    }
    return(
      <VStack gap="4" align="stretch">
      {localContent.map((review) => {
        if (!review) return null;
        const isLikedByUser = authUser && review.likes?.includes(authUser._id);
        const likesCount = review.likes?.length || 0;
        const isOwnReview = authUser &&(
            review.user?._id === authUser._id ||
            review.user === authUser._id ||
            (typeof review.user === "object" &&
              review.user?._id === authUser._id) ||
            (typeof review.user === "string" && review.user === authUser._id));

        const reviewUserId = getReviewUserId(review)
        return (
          <Card.Root
            key={review._id}
            width="100%"
            borderColor="brand.600"
            borderRadius="20px"
          >
            <Card.Body
              bg={context === "profile" ? "black" : "brand.900"}
              borderRadius="20px"
              padding={{
                base: "1rem",
                sm: "1rem",
                md: "1.5rem",
                lg: "1.5rem",
              }}
            >
              <HStack justify="space-between" mb="2" alignItems="start">
                <VStack align="start" gap="1">
                  <Text
                    fontWeight="semibold"
                    color="brand.500"
                    fontSize={{
                      base: "md",
                      sm: "lg",
                      md: "xl",
                      lg: "xl",
                    }}
                    paddingBottom={{
                      base: "0.5rem",
                      sm: "0.5rem",
                      md: "1rem",
                      lg: "1rem",
                    }}
                  >
                    {review.title}
                  </Text>

                  {context === "bookDetail" && (
                    // en BookDetail mostrar usuario
                    <HStack marginBottom="0.5rem">
                      <Avatar.Root
                        size="xs"
                        onClick={() =>
                          reviewUserId && handleUserClick(reviewUserId)
                        }
                      >
                        <Avatar.Fallback name={review.user?.username} />
                        {review.user?.profilePic && (
                          <Avatar.Image src={review.user.profilePic} />
                        )}
                      </Avatar.Root>
                      <Text fontSize="sm" color="muted.100">
                        By {review.user?.username || "Unknown user"}
                      </Text>
                    </HStack>
                  )}

                  {context === "profile" && (
                    //en Profile mostrar libro
                    <Text
                      fontSize={{
                        base: "0.7rem",
                        sm: "xs",
                        md: "sm",
                        lg: "sm",
                      }}
                      color="muted.100"
                    >
                      on {review.book.title || "Unknown Book"}
                    </Text>
                  )}
                </VStack>
                <Box
                  transform={{
                    base: "scale(0.8)",
                    sm: "scale(0.8)",
                    md: "scale(1)",
                    lg: "scale(1)",
                  }}
                  transformOrigin="right center"
                  margin={{ base: "0", sm: "2" }}
                >
                  <RatingGroup.Root
                    readOnly
                    count={5}
                    color="muted.100"
                    defaultValue={review.rating}
                    size={{
                      base: "xs",
                      sm: "xs",
                      md: "sm",
                      lg: "sm",
                    }}
                    colorPalette="yellow"
                    allowHalf
                    value={review.rating}
                    justifySelf="start"
                  >
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                </Box>
              </HStack>

              <Text
                fontSize={{
                  base: "xs",
                  sm: "sm",
                  md: "sm",
                  lg: "md",
                }}
                paddingBottom={{
                  base: "0.5rem",
                  sm: "0.5rem",
                  md: "1rem",
                  lg: "2rem",
                }}
                color="muted.200"
              >
                {review.content}
              </Text>
              <HStack justify="space-between" align="center">
                <HStack gap="2">
                  <IconButton
                    size={{
                      base: "xs",
                      sm: "xs",
                      md: "sm",
                      lg: "sm",
                    }}
                    variant="ghost"
                    backgroundColor="brand.800"
                    color="muted.300"
                    colorPalette={isLikedByUser ? "purple" : "gray"}
                    onClick={() => handleLike(review._id)}
                    _hover={{
                      boxShadow: "sm",
                      borderColor: "brand.300",
                    }}
                  >
                    {isLikedByUser ? <FaHeart /> : <FaRegHeart />}
                  </IconButton>
                  <Text
                    fontSize={{
                      base: "xs",
                      sm: "xs",
                      md: "sm",
                      lg: "sm",
                    }}
                    color="muted.100"
                  >
                    {likesCount} {likesCount === 1 ? "like" : "likes"}
                  </Text>
                </HStack>
                {isOwnReview && context === "profile" && (
                  <IconButton
                    size={{
                      base: "xs",
                      sm: "xs",
                      md: "sm",
                      lg: "sm",
                    }}
                    variant="ghost"
                    backgroundColor="brand.800"
                    color="muted.300"
                    onClick={() => handleDeleteReview(review._id)}
                    loading={deletingReview}
                    alignSelf="end"
                  >
                    <FaTrash />
                  </IconButton>
                )}
              </HStack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </VStack>
    )
    
  };

  const renderBooks = () => (
    <BookGrid 
      books={localContent}
      
     />
    
  );

  const renderUsers = () => {
    if(!localContent || localContent.length === 0){
      return (
            <Box textAlign="center" py="12">
              <Text fontSize="lg" color="muted.100">
                No users found
              </Text>
            </Box>
          );
    }
    
    <VStack gap="4" align="stretch">
      
      {localContent?.map((user) => {
          const isFollowing = getIsFollowing(user._id);
          const isOwnProfile = authUser?._id === user._id;
        return (
          <Card.Root key={user._id} width="100%" borderColor="black" backgroundColor="black" borderRadius="20px">
            <Card.Body
              padding={{
                base: "1rem",
                sm: "1rem",
                md: "1.5rem",
                lg: "1.5rem",
              }}

            >
              <HStack justify="space-between" align="center">
                <HStack
                  gap="4"
                  flex="1"
                  cursor="pointer"
                  onClick={() => handleUserClick(user._id)}
                >
                  <Avatar.Root size="md">
                    <Avatar.Fallback name={user.username} />
                    {user.profilePic && <Avatar.Image src={user.profilePic} />}
                  </Avatar.Root>
                  <VStack align="start" gap="1">
                    <Text
                      fontWeight="semibold"
                      fontSize={{
                        base: "sm",
                        sm: "sm",
                        md: "md",
                        lg: "md",
                      }}
                      color="muted.200"
                    >
                      {user.username}
                    </Text>
                    <Text
                      fontSize={{
                        base: "xs",
                        sm: "xs",
                        md: "sm",
                        lg: "sm",
                      }}
                      color="muted.100"
                    >
                      {user.email}
                    </Text>
                    <HStack gap="4">
                      <Text
                        fontSize={{
                          base: "0.7rem",
                          sm: "0.7rem",
                          md: "xs",
                          lg: "xs",
                        }}
                        color="brand.100"
                      >
                        {user.followers?.length || 0} followers
                      </Text>
                      <Text
                        fontSize={{
                          base: "0.7rem",
                          sm: "0.7rem",
                          md: "xs",
                          lg: "xs",
                        }}
                        color="brand.100"
                      >
                        {user.following?.length || 0} following
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>

                {!isOwnProfile && (
                  <Button
                    size="sm"
                    variant="outline"
                    bg={isFollowing ? "brand.800" : "brand.600"}
                    _focus={{
                      outline: "none !important",
                    }}
                    onClick={() => handleFollow(user._id)}
                    _hover={{
                      boxShadow: "sm",
                      borderColor: "brand.300",
                    }}
                    maxWidth={{
                      base: "20px",
                      sm: "100px",
                      md: "150px",
                      lg: "150px",
                    }}
                    maxHeight={{
                      base: "30px",
                      sm: "150px",
                      md: "150px",
                      lg: "150px",
                    }}
                    color="muted.200"
                  >
                    <Box
                      as={isFollowing ? FaUserCheck : FaUserPlus}
                      width={{
                        base: "14px",
                        sm: "20px",
                        md: "20px",
                        lg: "20px",
                      }}
                      height={{
                        base: "16px",
                        sm: "20px",
                        md: "20px",
                        lg: "20px",
                      }}
                    />
                    {
                      <Text
                        fontSize={{
                          base: "xs",
                          sm: "xs",
                          md: "md",
                          lg: "md",
                        }}
                        display={{ base: "none", sm: "block" }}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Text>
                    }
                    {/* {isFollowing ? "Following" : "Follow"} */}
                    {/* {isFollowing ? <FaUserCheck /> : <FaUserPlus />} */}
                  </Button>
                )}
              </HStack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </VStack>
  };


  // const renderEmpty = () => (
  //   <Text color="muted.100">
  //     There are no elements added to your {tabTitle}.
  //   </Text>
  // );

  return (
    <Box>
      {contentType === "books" && renderBooks()}
      {contentType === "reviews" && renderReviews()}
      {contentType === "users" && renderUsers()}
      {/* {contentType === "empty" && renderEmpty()} */}
    </Box>
  );
}

export default Tab;