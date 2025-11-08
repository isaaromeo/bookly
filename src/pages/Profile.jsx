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
  Grid,
  GridItem,
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
import { LuSettings, LuPen } from "react-icons/lu";
import { Tab } from "../styledComponents/Tab.jsx";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    padding: 1rem;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("library");
  const { user: authUser, logout, login, loading: authLoading } = useAuth();
  const { userId } = useParams();

  const isOwnProfile = !userId || userId === authUser?._id;
  const profileUserId = userId || authUser?._id;

  const { followUser, loading: followLoading } = useBooklyApi.useFollowUser();
  const {
    data: user,
    loading: userLoading,
    error,
    refetch,
  } = useBooklyApi.useUser(profileUserId);

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

  const handleFollow = useCallback(async () => {
    if (!authUser) {
      alert("You must be logged in to follow users");
      return;
    }
    try {
      const result = await followUser(profileUserId);
      if (result && result.user) {
        const token = localStorage.getItem("token");
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
      <Card.Root id="profile-header">
        <Card.Body bg="brand.900" padding={{ base: "4", md: "6" }}>
          {/* Layout Grid con 3 columnas y 2 filas */}
          <Grid
            templateColumns={{
              base: "auto 1fr auto",
              md: "auto 1fr auto",
            }}
            templateRows="auto auto"
            gap={{ base: "3", md: "4" }}
            alignItems="start"
          >
            {/* Columna 1 - Avatar (Fila 1) */}
            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Avatar.Root
                width={{
                  base: "90px",
                  sm: "100px",
                  md: "120px",
                  lg: "1200px",
                }}
                height={{
                  base: "90px",
                  sm: "100px",
                  md: "120px",
                  lg: "120px",
                }}
              >
                <Avatar.Fallback name={user.username} />
                {user.profilePic && <Avatar.Image src={user.profilePic} />}
              </Avatar.Root>
            </GridItem>

            {/* Columna 2 - Información del usuario (Fila 1) */}
            <GridItem>
              <VStack align="start" gap="1">
                <HStack gap="3" align="center">
                  <Text
                    fontSize={{
                      base: "xl",
                      md: "2xl",
                      lg: "3xl",
                    }}
                    fontWeight="bold"
                  >
                    {user.username}
                  </Text>
                  <Badge
                    colorPalette="purple"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {user.rol}
                  </Badge>
                </HStack>
                <Text
                  color="gray.500"
                  fontSize={{
                    base: "sm",
                    md: "md",
                    lg: "lg",
                  }}
                >
                  {user.email}
                </Text>
              </VStack>
            </GridItem>

            {/* Columna 3 - Botones (Fila 1) */}
            <GridItem>
              <VStack gap="2" align="end">
                {isOwnProfile ? (
                  <>
                    <Button
                      variant="outline"
                      bg="brand.800"
                      color="brand.100"
                      onClick={handleEditProfile}
                      _hover={{
                        boxShadow: "sm",
                        borderColor: "brand.300",
                      }}
                      maxWidth={{ base: "150px", md: "150px" }}
                    >
                      <LuPen style={{ marginRight: "8px" }} />
                      <Text display={{ base: "none", sm: "block" }}>
                        Edit Profile
                      </Text>
                    </Button>
                    {authUser.rol === "admin" && (
                      <Button
                        variant="outline"
                        bg="brand.800"
                        color="brand.100"
                        onClick={handleAdminTools}
                        _hover={{
                          boxShadow: "sm",
                          borderColor: "brand.300",
                        }}
                        maxWidth={{ base: "150px", md: "150px" }}
                      >
                        <LuSettings style={{ marginRight: "8px" }} />
                        <Text display={{ base: "none", sm: "block" }}>
                          Admin Tools
                        </Text>
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="outline"
                    bg={isFollowing ? "brand.800" : "brand.600"}
                    onClick={() => handleFollow(user._id)}
                    _hover={{
                      boxShadow: "sm",
                      borderColor: "brand.300",
                    }}
                    size={{ base: "sm", md: "md" }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                    {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                  </Button>
                )}
              </VStack>
            </GridItem>

            {/* Columna 1 - Seguidores (Fila 2) */}
            <GridItem>
              <VStack align="start" gap="3">
                <HStack gap="6">
                  <VStack align="start" gap="1" alignItems="center">
                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                      {user.followers?.length || 0}
                    </Text>
                    <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
                      Followers
                    </Text>
                  </VStack>
                  <VStack align="start" gap="1" alignItems="center">
                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                      {user.following?.length || 0}
                    </Text>
                    <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
                      Following
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </GridItem>

            {/* Columna 2 y 3 vacías en Fila 2 */}
            <GridItem />
            <GridItem />
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Resto del componente (tabs) se mantiene igual */}
      <Card.Root bg="brand.900" mt="4">
        <Card.Header>
          <Tabs.Root
            value={activeTab}
            onValueChange={(e) => setActiveTab(e.value)}
          >
            <Tabs.List gap="0.5">
              <Tabs.Trigger
                value="library"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
              >
                <FaBook style={{ marginRight: "8px" }} />
                Library
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tbr"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
              >
                <FaBookmark style={{ marginRight: "8px" }} />
                TBR
              </Tabs.Trigger>
              <Tabs.Trigger
                value="reviews"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
              >
                <FaBook style={{ marginRight: "8px" }} />
                Reviews
              </Tabs.Trigger>
              <Tabs.Trigger
                value="followers"
                bg="brand.800"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
              >
                <FaUserFriends style={{ marginRight: "8px" }} />
                Followers
              </Tabs.Trigger>
              <Tabs.Trigger
                value="following"
                bg="brand.800"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
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
