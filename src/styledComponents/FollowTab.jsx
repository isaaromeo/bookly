import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

export const FollowTab = ({ userId, tabType = "followers" }) => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { followUser } = useBooklyApi.useFollowUser();
  const {
    data: followData,
    loading,
    error,
  } = useBooklyApi.useUserFollowData(userId, tabType);

  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    if (followData && followData[tabType]) {
      setLocalUsers(followData[tabType]);
    }
  }, [followData, tabType]);

  const handleFollow = async (targetUserId) => {
    if (!authUser) {
      alert("Please log in to follow users");
      return;
    }

    try {
      const result = await followUser(authUser._id, targetUserId);

      // Actualizar estado local
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === targetUserId
            ? {
                ...user,
              }
            : user
        )
      );

      // TODO  recargar los datos
    } catch (error) {
      console.error("Error following user:", error);
    }
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" padding="8">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="8">
        <Text color="fg.error">
          Error loading {tabType}: {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="xl" mb="4">
        {tabType === "followers" ? "Followers" : "Following"} (
        {localUsers.length})
      </Text>

      {localUsers.length > 0 ? (
        <VStack gap="4" align="stretch">
          {localUsers.map((user) => (
            <Card.Root key={user._id} width="100%">
              <Card.Body>
                <HStack justify="space-between" align="center">
                  <HStack gap="3" flex="1">
                    <Avatar.Root
                      size="md"
                      cursor="pointer"
                      onClick={() => navigate(`/profile`)}
                    >
                      <Avatar.Fallback name={user.username} />
                      {user.profilePic && (
                        <Avatar.Image src={user.profilePic} />
                      )}
                    </Avatar.Root>

                    <VStack align="start" gap="1" flex="1">
                      <Text
                        fontWeight="semibold"
                        cursor="pointer"
                        onClick={() => navigate(`/profile`)}
                        _hover={{ textDecoration: "underline" }}
                      >
                        {user.username}
                      </Text>
                      <Text fontSize="sm" color="fg.muted">
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>

                  {authUser && authUser._id !== user._id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFollow(user._id)}
                    >
                      Follow
                    </Button>
                  )}
                </HStack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      ) : (
        <Box textAlign="center" padding="8">
          <Text color="fg.muted">
            {tabType === "followers"
              ? "No followers yet"
              : "Not following anyone yet"}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default FollowTab;
