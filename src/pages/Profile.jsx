import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaBook, FaBookmark, FaEdit } from "react-icons/fa";
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
  const { user: authUser, logout, loading: authLoading } = useAuth();
  //console.log("user: ", authUser._id)

//con nuevo hook useApi general
  const {
    data: user,
    loading: userLoading,
    error,
  } = useBooklyApi.useUser(authUser?._id);//solo ejecutar si hay user

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
if (!authUser) {
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
                <Button variant="outline" leftIcon={<FaEdit />}>
                  Edit Profile
                </Button>
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
        </Card.Body>
      </Card.Root>
    </ProfileContainer>
  );
};


export default Profile;
