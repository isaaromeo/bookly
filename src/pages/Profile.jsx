import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  Avatar,
  VStack,
  HStack,
  Grid,
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
  const { user: authUser, logout } = useAuth();
  console.log("user: ", authUser._id)

//con nuevo hook useApi general
  const {
    data: user,
    loading,
    error,
  } = useBooklyApi.useUser(authUser._id);

  useEffect(() => {
    if (!authUser && !loading) {
      navigate("/login");
    }
  }, [authUser, loading, navigate]);

  

  //actualizar useApiData para traer todo tipo d atos no solo books
  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");

  //   setUser(JSON.parse(userData));
  //   fetchUserData(JSON.parse(userData)._id, token);
  // }, [navigate]);

  // const fetchUserData = async (userId, token) => {
  //   try {
  //     const response = await fetch(
  //       `https://bookly-back.onrender.com/api/user/${userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const userData = await response.json();
  //       setUser(userData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  if (!user) {
    return <div>Loading...</div>;
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
            <Tab content={user.library} tabTitle="Library" />
          )}
          {activeTab === "tbr" && <Tab content={user.tbr} tabTitle="TBR" />}
          {activeTab === "reviews" && (
            <Tab content={user.reviews} tabTitle="Reviews" />
          )}
        </Card.Body>
      </Card.Root>
    </ProfileContainer>
  );
};


export default Profile;
