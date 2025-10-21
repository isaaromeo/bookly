import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  Avatar,
  VStack,
  HStack,
  Spinner,
  Alert,
  Button,
  Tabs,
  Badge,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
  FaBook,
  FaBookmark,
  FaEdit,
  FaUserFriends,
  FaUserPlus,
  FaUserCheck
} from "react-icons/fa";
import { Tab } from "../styledComponents/Tab.jsx";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";



const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("library");
  const { user: authUser, logout, login, loading: authLoading } = useAuth();
  const { userId } = useParams();

  //Para ver si estamos en nuestro perfil
  const isOwnProfile = !userId || userId === authUser?._id;
  const profileUserId = userId || authUser?._id;

  //follow
  const { followUser, loading: followLoading } = useBooklyApi.useFollowUser();

  //obetener user data con nuevo hook useApi general
  const {
    data: user,
    loading: userLoading,
    error,
    refetch, //para actualizar despues del follow
  } = useBooklyApi.useUser(profileUserId);
  
//porq hay dos casos:
//1- que .following sea array de ids
//2- que .following dea array de obj user
const getIsFollowing = () => {
  if (!authUser || !authUser.following) return false;
  if (
    authUser.following.length > 0 &&
    typeof authUser.following[0] === "string"
  ) {
    return authUser.following.includes(profileUserId);
  }
  if (
    authUser.following.length > 0 &&
    typeof authUser.following[0] === "object"
  ) {
    return authUser.following.some(
      (followedUser) => followedUser && followedUser._id === profileUserId
    );
  }

  return false;
};

const isFollowing = getIsFollowing();

  const handleFollow = async () => {
    if (!authUser) {
      alert("You must be logged in to follow users");
      return;
    }

    try {
      const result = await followUser(profileUserId);

      if (result && result.user) {
        console.log("user followed succesfully");
        console.log("isFollowing 2", isFollowing);
        const token = localStorage.getItem("token");
        //actualizamos el contexto
        login(result.user, token);
        refetch();
      }
    } catch (error) {
      console.error("Error following user:", error);
      alert("Error following user");
    }
  };

  //TODO editar perfil
  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  useEffect(() => {
    if (!authUser && !authLoading) {
      navigate("/login");
    }
  }, [authUser, authLoading, navigate]);

  const loading = authLoading || userLoading;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" padding="8">
        <Spinner size="lg" />
      </Box>
    );
  }
  //si no hay user autenticado
  if (!authUser && !userId) {
    return (
      <Alert.Root status="warning">
        <Alert.Indicator />
        <Alert.Title>Please log in to view your profile</Alert.Title>
        <Button
          onClick={() => navigate("/login")}
          colorPalette="purple"
          size="sm"
        >
          Login
        </Button>
      </Alert.Root>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>Error loading profile: {error}</Alert.Title>
      </Alert.Root>
    );
  }

  if (!user) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>User not found</Alert.Title>
      </Alert.Root>
    );
  }
  return (
    <ProfileContainer>
      {/* <ProfileHead user={user} isOwnProfile={isOwnProfile} /> */}
      <Card.Root id="profile-header">
        <Card.Body>
          <HStack gap="6">
            <Avatar.Root boxSize="120px">
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
                    size="sm"
                    colorScheme="purple"
                    variant={isFollowing ? "ghost" : "solid"}
                    // color={isFollowing ? "gray.600" : "white"}
                    bg={isFollowing ? "gray.600" : "purple.400"}
                    border={isFollowing ? "1px solid" : "none"}
                    borderColor={isFollowing ? "gray.300" : "transparent"}
                    leftIcon={isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    onClick={() => handleFollow(user._id)}
                    _hover={{
                      bg: isFollowing ? "gray.200" : "purple.600",
                    }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </HStack>

              <HStack gap="6">
                <VStack align="center">
                  <Text fontWeight="bold">{user.followers?.length || 0}</Text>
                  <Text fontSize="sm">Followers</Text>
                </VStack>
                <VStack align="center">
                  <Text fontWeight="bold">{user.following?.length || 0}</Text>
                  <Text fontSize="sm">Following</Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Tabs.Root
            value={activeTab}
            onValueChange={(e) => setActiveTab(e.value)}
          >
            <Tabs.List>
              <Tabs.Trigger value="library">
                <FaBook style={{ marginRight: "8px" }} />
                Library
              </Tabs.Trigger>
              <Tabs.Trigger value="tbr">
                <FaBookmark style={{ marginRight: "8px" }} />
                TBR
              </Tabs.Trigger>
              <Tabs.Trigger value="reviews">
                <FaBook style={{ marginRight: "8px" }} />
                Reviews
              </Tabs.Trigger>
              <Tabs.Trigger value="followers">
                <FaUserFriends style={{ marginRight: "8px" }} />
                Followers ({user.followers?.length || 0})
              </Tabs.Trigger>
              <Tabs.Trigger value="following">
                <FaUserPlus style={{ marginRight: "8px" }} />
                Following ({user.following?.length || 0})
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Card.Header>

        <Card.Body>
          {activeTab === "library" && (
            <Tab
              content={user.library}
              contentType={"books"}
              tabTitle="Library"
              currentUserId={authUser?._id}
            />
          )}
          {activeTab === "tbr" && (
            <Tab content={user.tbr} contentType={"books"} tabTitle="TBR" />
          )}
          {activeTab === "reviews" && (
            <Tab
              content={user.reviews}
              contentType={"reviews"}
              tabTitle="Reviews"
              currentUserId={authUser?._id}
            />
          )}
          {activeTab === "followers" && (
            <Tab
              content={user.followers}
              contentType="users"
              tabTitle="Followers"
              currentUserId={authUser?._id}
            />
          )}
          {activeTab === "following" && (
            <Tab
              content={user.following}
              contentType="users"
              tabTitle="Following"
              currentUserId={authUser?._id}
            />
          )}
        </Card.Body>
      </Card.Root>
    </ProfileContainer>
  );
};


export default Profile;
