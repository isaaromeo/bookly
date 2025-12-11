import {
  Box,
  Card,
  Text,
  Avatar,
  VStack,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { FaEdit, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProfileHead = ({ user, isOwnProfile = false }) => {
  const { user: authUser, login } = useAuth();
  const { mutate: followUser, isLoading: followLoading } =
    useBooklyApi.useFollowUser();
  const navigate = useNavigate();

  const isFollowing = authUser?.following?.includes(user._id);

  const handleFollow = async () => {
    if (!authUser) {
      alert("You must be logged in to follow users");
      return;
    }

    followUser(user._id, {
      onSuccess: (data) => {
        
        if (data.user._id === authUser._id) {
          const token = localStorage.getItem("token");
          login(data.user, token);
        }
      },
      onError: (error) => {
        console.error("Error following user:", error);
        alert(`Error: ${error.message}`);
      },
    });
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Card.Root id="profile-header">
      <Card.Body>
        <HStack gap="6">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={user.username} />
            {user.profilePic && <Avatar.Image src={user.profilePic} />}
          </Avatar.Root>

          <VStack align="start" flex="1">
            <HStack justify="space-between" width="100%">
              <VStack align="start">
                <Text fontSize="2xl" fontWeight="bold">
                  {user.username}
                </Text>
                <Text color="gray.500">{user.email}</Text>
                <Badge colorPalette="purple">{user.rol}</Badge>
              </VStack>

              {isOwnProfile ? (
                <Button
                  variant="outline"
                  leftIcon={<FaEdit />}
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  colorPalette={isFollowing ? "gray" : "purple"}
                  leftIcon={isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                  loading={followLoading}
                  onClick={handleFollow}
                  color="muted.200"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </HStack>

            <HStack gap="6">
              <VStack align="center" cursor="pointer">
                <Text fontWeight="bold">{user.followers?.length || 0}</Text>
                <Text fontSize="sm">Followers</Text>
              </VStack>
              <VStack align="center" cursor="pointer">
                <Text fontWeight="bold">{user.following?.length || 0}</Text>
                <Text fontSize="sm">Following</Text>
              </VStack>
              <VStack align="center">
                <Text fontWeight="bold">{user.library?.length || 0}</Text>
                <Text fontSize="sm">Books</Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProfileHead;
