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
  Flex,
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
import { toaster} from "../components/ui/toaster.jsx"


const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    padding: 0rem;
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
      
      toaster.create({
        title: "Authentication Required",
        description: "You must be logged in to follow users",
        type: "error",
      });
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
      toaster.create({
        title: "Error following user",
        description: `Error: ${error}`,
        type: "error",
      });
      
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
      <Card.Root id="profile-header" borderColor="brand.900">
        <Card.Body bg="brand.900" padding={{ base: "4", md: "6" }}>
          <Grid
            templateColumns={{
              base: "auto 1fr auto",
              md: "auto 1fr auto",
            }}
            templateRows="auto auto"
            gap={{ base: "3", md: "4" }}
            alignItems="start"
          >
            <GridItem
              display="flex"
              alignItems="center"
              justifyContent={{
                base: "start",
                sm: "start",
                md: "start",
                lg: "center",
              }}
              height="100%"
              pt="0.5rem"
              pb="0.5rem"
              pl="0.3rem"
            >
              <Avatar.Root
                width={{
                  base: "70px",
                  sm: "70px",
                  md: "70px",
                  lg: "120px",
                }}
                height={{
                  base: "70px",
                  sm: "70px",
                  md: "70px",
                  lg: "120px",
                }}
              >
                <Avatar.Fallback name={user.username} />
                {user.profilePic && <Avatar.Image src={user.profilePic} />}
              </Avatar.Root>
            </GridItem>

            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="start"
              height="100%"
              ml={{
                base: "0px",
                sm: "0px",
                md: "1rem",
                lg: "1rem",
              }}
            >
              <VStack align="start" gap="3">
                <HStack
                  gap={{
                    base: "3",
                    sm: "3",
                    md: "4",
                    lg: "6",
                  }}
                >
                  <VStack align="start" gap="1" alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={{
                        base: "sm",
                        sm: "md",
                        md: "md",
                        lg: "xl",
                      }}
                      color="muted.200"
                    >
                      {user.followers?.length || 0}
                    </Text>
                    <Text
                      fontSize={{
                        base: "xs",
                        sm: "md",
                        md: "md",
                        lg: "xl",
                      }}
                      color="gray.500"
                    >
                      Followers
                    </Text>
                  </VStack>
                  <VStack align="start" gap="1" alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={{
                        base: "sm",
                        sm: "md",
                        md: "md",
                        lg: "xl",
                      }}
                      color="muted.200"
                    >
                      {user.following?.length || 0}
                    </Text>
                    <Text
                      fontSize={{
                        base: "xs",
                        sm: "md",
                        md: "md",
                        lg: "xl",
                      }}
                      color="gray.500"
                    >
                      Following
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </GridItem>

            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="start"
              height="100%"
            >
              <VStack
                gap={{
                  base: "0",
                  sm: "2",
                  md: "2",
                  lg: "2",
                }}
                align="top"
              >
                {isOwnProfile ? (
                  <>
                    <Button
                      variant="outline"
                      bg={{
                        base: "transparent",
                        sm: "brand.800",
                        md: "brand.800",
                        lg: "brand.800",
                      }}
                      color="brand.100"
                      onClick={handleEditProfile}
                      _hover={{
                        boxShadow: "sm",
                        borderColor: "brand.300",
                      }}
                      maxWidth={{
                        base: "20px",
                        sm: "150px",
                        md: "150px",
                        lg: "150px",
                      }}
                    >
                      {/* <LuPen /> */}
                      <Box
                        as={LuPen}
                        width={{
                          base: "16px",
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
                      <Text
                        display={{
                          base: "none",
                          sm: "block",
                          md: "block",
                          lg: "block",
                        }}
                      >
                        Edit Profile
                      </Text>
                    </Button>
                    {authUser.rol === "admin" && (
                      <Button
                        variant="outline"
                        bg={{
                          base: "transparent",
                          sm: "brand.800",
                          md: "brand.800",
                          lg: "brand.800",
                        }}
                        color="brand.100"
                        onClick={handleAdminTools}
                        _hover={{
                          boxShadow: "sm",
                          borderColor: "brand.300",
                        }}
                        maxWidth={{
                          base: "20px",
                          sm: "150px",
                          md: "150px",
                          lg: "150px",
                        }}
                      >
                        {/* <LuSettings
                          size={12}
                        /> */}
                        <Box
                          as={LuSettings}
                          width={{
                            base: "16px",
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
                        <Text
                          display={{
                            base: "none",
                            sm: "block",
                            md: "block",
                            lg: "block",
                          }}
                        >
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
                    maxWidth={{
                      base: "20px",
                      sm: "110px",
                      md: "150px",
                      lg: "150px",
                    }}
                    maxHeight={{
                      base: "30px",
                      sm: "150px",
                      md: "150px",
                      lg: "150px",
                    }}
                    mb={{
                      base: "1rem",
                    }}
                  >
                    <Box
                      as={isFollowing ? FaUserCheck : FaUserPlus}
                      width={{
                        base: "16px",
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
                      color="muted.200"
                    />
                    {
                      <Text
                        display={{
                          base: "none",
                          sm: "block",
                          md: "block",
                          lg: "block",
                        }}
                        color="muted.200"
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Text>
                    }

                    {/* {isFollowing ? <FaUserCheck /> : <FaUserPlus />} */}
                  </Button>
                )}
              </VStack>
            </GridItem>

            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <VStack
                align="start"
                gap="1"
                marginLeft={{ base: "0", md: "1rem" }}
                width="100%"
              >
                <Flex
                  align="center"
                  direction="column"
                  gap={{
                    base: "1",
                    md: "3",
                  }}
                  justify="flex-start"
                >
                  <Text
                    fontSize={{
                      base: "sm",
                      sm: "md",
                      md: "lg",
                      lg: "xl",
                    }}
                    fontWeight="bold"
                    alignSelf="start"
                    color="muted.200"
                  >
                    {user.username}
                  </Text>
                  <Text
                    fontSize={{
                      base: "0.7rem",
                      sm: "xs",
                      md: "sm",
                      lg: "lg",
                    }}
                    color="muted.100"
                  >
                    {user.email}
                  </Text>
                  <Badge
                    colorPalette="purple"
                    fontSize={{
                      base: "xs",
                      sm: "sm",
                      md: "xs",
                      lg: "lg",
                    }}
                    alignSelf="start"
                  >
                    {user.rol === "admin" ? "admin" : "bookworm"}
                  </Badge>
                </Flex>
              </VStack>
            </GridItem>

            <GridItem></GridItem>
            <GridItem></GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>

      <Card.Root bg="brand.900" mt="4" borderColor="brand.900">
        <Card.Header>
          <Tabs.Root
            value={activeTab}
            onValueChange={(e) => setActiveTab(e.value)}
          >
            <Tabs.List
              gap="0.5"
              borderBottom="1px solid"
              borderColor="brand.900"
            >
              <Tabs.Trigger
                value="library"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
                padding={{
                  base: "0.3em 0.8em",
                  sm: "0.3em 0.8em",
                  md: "block",
                  lg: "block",
                }}
                color="muted.100"
                _selected={{
                  color: "muted.200",
                  borderBottom: "1px solid",
                  borderColor: "brand.100",
                }}
              >
                <FaBook />
                <Text
                  display={{
                    base: "none",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  }}
                  ml="2"
                >
                  Library
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tbr"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
                padding={{
                  base: "0.3em 0.8em",
                  sm: "0.3em 0.8em",
                  md: "block",
                  lg: "block",
                }}
                color="muted.100"
                _selected={{
                  color: "muted.200",
                  borderBottom: "1px solid",
                  borderColor: "brand.100",
                }}
              >
                <FaBookmark />
                <Text
                  display={{
                    base: "none",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  }}
                  ml="2"
                >
                  TBR
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="reviews"
                bg="brand.700"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
                padding={{
                  base: "0.3em 0.8em",
                  sm: "0.3em 0.8em",
                  md: "block",
                  lg: "block",
                }}
                color="muted.100"
                _selected={{
                  color: "muted.200",
                  borderBottom: "1px solid",
                  borderColor: "brand.100",
                }}
              >
                <FaBook />
                <Text
                  display={{
                    base: "none",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  }}
                  ml="2"
                >
                  Reviews
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="followers"
                bg="brand.800"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
                padding={{
                  base: "0.3em 0.8em",
                  sm: "0.3em 0.8em",
                  md: "block",
                  lg: "block",
                }}
                color="muted.100"
                _selected={{
                  color: "muted.200",
                  borderBottom: "1px solid",
                  borderColor: "brand.100",
                }}
              >
                <FaUserFriends />
                <Text
                  display={{
                    base: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  }}
                  ml="2"
                >
                  Followers
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="following"
                bg="brand.800"
                _hover={{ boxShadow: "sm", borderColor: "brand.300" }}
                _focus={{ outline: "none !important" }}
                padding={{
                  base: "0.3em 0.8em",
                  sm: "0.2em 0.em",
                  md: "block",
                  lg: "block",
                }}
                color="muted.100"
                _selected={{
                  color: "muted.200",
                  borderBottom: "1px solid",
                  borderColor: "brand.100",
                }}
              >
                <FaUserPlus />

                <Text
                  display={{
                    base: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                  }}
                  fontSize={{
                    sm: "xs",
                    md: "md",
                    lg: "lg",
                  }}
                >
                  Following
                </Text>
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
