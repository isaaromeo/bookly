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
import { FaHeart, FaRegHeart, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { user } from "@heroui/react";

export const Tab = ({ content, tabTitle, contentType, currentUserId }) => {
  const navigate = useNavigate();
  const { user: authUser, login } = useAuth();
  const { likeReview } = useBooklyApi.useLikeReview();
  const { followUser } = useBooklyApi.useFollowUser();
  const [localContent, setLocalContent] = useState([]); //para poder ver el cambio del like irl

  useEffect(() => {
    if (content) {
      setLocalContent([...content]);
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
      setLocalContent((prevContent) =>
        prevContent.map((elem) =>
          elem._id === reviewId
            ? {
                ...elem,
                likes: result.elem.likes,
                likesCount: result.elem.likes.length,
              }
            : elem
        )
      );
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleFollow = async (userId) => {
    
    if (!authUser) {
      alert("Please log in to follow users");
      return;
    }

    try {
      const result = await followUser(userId);

      if (result && result.user) {
        console.log("user followed succesfully")
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
      console.error("Error following user:", error);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // const isFollowingUser = (userId) => {
  //   return authUser?.following?.includes(userId);
  // };

  const isLikedReview = (review) => {
    return authUser && review.likes?.includes(authUser._id);
  };

  const renderReviews = () => (
    <VStack gap="4" align="stretch">
      {localContent.map((review) => {
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
      {localContent.map((book) => (
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

  const renderUsers = () => (
    <VStack gap="4" align="stretch">
      {localContent.map((user) => {
        const isFollowing =
          authUser?.following?.some(
            (followedUser) => followedUser._id === user._id
          ) || false;
        const isOwnProfile = authUser?._id === user._id;

        return (
          <Card.Root key={user._id} width="100%">
            <Card.Body>
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
                    <Text fontWeight="semibold">{user.username}</Text>
                    <Text fontSize="sm" color="fg.muted">
                      {user.email}
                    </Text>
                    <HStack gap="4">
                      <Text fontSize="xs" color="fg.muted">
                        {user.followers?.length || 0} followers
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {user.following?.length || 0} following
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>

                {!isOwnProfile && (
                  <Button
                    size="sm"
                    colorPalette={isFollowing ? "gray" : "green"}
                    leftIcon={isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    onClick={() => handleFollow(user._id)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </HStack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </VStack>
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
      {contentType === "users" && renderUsers()}
      {contentType === "empty" && renderEmpty()}
    </Box>
  );
}

export default Tab;