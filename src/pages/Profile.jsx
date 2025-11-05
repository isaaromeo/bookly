import { useState, useEffect, useMemo, useCallback } from "react";
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
  FaUserCheck,
} from "react-icons/fa";

import {
  LuSettings,
  LuPen
} from "react-icons/lu";
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
const isFollowing = useMemo(() => {
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
}, [authUser, profileUserId]);

// const isFollowing = getIsFollowing();

  const handleFollow = useCallback(async () => {
    if (!authUser) {
      alert("You must be logged in to follow users");
      return;
    }

    try {
      const result = await followUser(profileUserId);

      if (result && result.user) {
        const token = localStorage.getItem("token");
        //actualizamos el contexto
        login(result.user, token);
        refetch();
      }
    } catch (error) {
      console.error("Error following user:", error);
      alert("Error following user");
    }
  }, [authUser, profileUserId, followUser, login, refetch]);

 
  const handleEditProfile = useCallback(() => {
    navigate("/editProfile");
  }, [navigate]);

    const handleAdminTools = useCallback(() => {
      navigate("/adminTools");
    }, [navigate]);

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
        <Card.Body bg="brand.900">
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
                <VStack>
                  {isOwnProfile ? (
                    <Button
                      variant="outline"
                      bg="brand.800"
                      color="brand.100"
                      maxWidth="130px"
                      onClick={handleEditProfile}
                      _hover={{
                        boxShadow: "sm",
                        borderColor: "brand.300",
                      }}
                    >
                      Edit Profile
                      {/* <LuPen/> para pantallas peques
                      quedaria mejor con el boton de admin tools en un mini menu*/}
                    </Button>
                  ) : (
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
                    >
                      {isFollowing ? "Following" : "Follow"}
                      {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    </Button>
                  )}
                  {isOwnProfile && authUser.rol === "admin" && (
                    <Button
                      variant="outline"
                      bg="brand.800"
                      color="brand.100"
                      maxWidth="120px"
                      onClick={handleAdminTools}
                      _hover={{
                        boxShadow: "sm",
                        borderColor: "brand.300",
                      }}
                    >
                      Admin Tools
                      {/* <LuSettings /> para pantallas peques */}
                    </Button>
                  )}
                </VStack>
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

      <Card.Root bg="brand.900">
        <Card.Header>
          <Tabs.Root
            value={activeTab}
            onValueChange={(e) => setActiveTab(e.value)}
          >
            <Tabs.List gap="0.5">
              <Tabs.Trigger
                value="library"
                bg="brand.700"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                _focus={{
                  outline: "none !important",
                }}
              >
                <FaBook style={{ marginRight: "8px" }} />
                Library
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tbr"
                bg="brand.700"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                _focus={{
                  outline: "none !important",
                }}
              >
                <FaBookmark style={{ marginRight: "8px" }} />
                TBR
              </Tabs.Trigger>
              <Tabs.Trigger
                value="reviews"
                bg="brand.700"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                _focus={{
                  outline: "none !important",
                }}
              >
                <FaBook style={{ marginRight: "8px" }} />
                Reviews
              </Tabs.Trigger>
              <Tabs.Trigger
                value="followers"
                bg="brand.800"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                _focus={{
                  outline: "none !important",
                }}
              >
                <FaUserFriends style={{ marginRight: "8px" }} />
                Followers
              </Tabs.Trigger>
              <Tabs.Trigger
                value="following"
                bg="brand.800"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
                _focus={{
                  outline: "none !important",
                }}
              >
                <FaUserPlus style={{ marginRight: "8px" }} />
                Following
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
              context="profile"
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
