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
  const { followUser, loading: followLoading } =
    useBooklyApi.useFollowUser();
  

  //obetener user data con nuevo hook useApi general
  const {
    data: user,
    loading: userLoading,
    error,
    refetch //para actualizar despues del follow
  } = useBooklyApi.useUser(profileUserId); 

  // const isFollowing = authUser?.following?.includes(userId);
  const [localIsFollowing, setLocalIsFollowing] = useState(
    authUser?.following?.includes(profileUserId)
  );

  useEffect(() => {
    setLocalIsFollowing(authUser?.following?.includes(profileUserId));
  }, [authUser, profileUserId]);

  const handleFollow = async () => {
    if (!authUser) {
      alert("You must be logged in to follow users");
      return;
    }

    setLocalIsFollowing(!localIsFollowing);

    try {
      const data = await followUser(userId);
      if(data){
        console.log("user followed succesfully")
        const token = localStorage.getItem("token");
        console.log("data user", data.user, "isFollowing", localIsFollowing);
        login(data.user, token);

      }
      refetch()
  
      
    } catch (error) {
      console.error("Error following user:", error);
      setLocalIsFollowing(!localIsFollowing);
    }
  };

  

  const handleEditProfile = () => {
    navigate("/edit");
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
                    colorPalette={localIsFollowing ? "gray" : "purple"}
                    leftIcon={
                      localIsFollowing ? <FaUserCheck /> : <FaUserPlus />
                    }
                    loading={followLoading}
                    onClick={handleFollow}
                  >
                    {localIsFollowing ? "Following" : "Follow"}
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
            />
          )}
          {activeTab === "followers" && (
            <Tab
              content={user.followers}
              contentType="users"
              tabTitle="Followers"
            />
          )}
          {activeTab === "following" && (
            <Tab
              content={user.following}
              contentType="users"
              tabTitle="Following"
            />
          )}
        </Card.Body>
      </Card.Root>
    </ProfileContainer>
  );
};


export default Profile;
