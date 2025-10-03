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
import { FaEdit } from "react-icons/fa";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //actualizar useApiData para traer todo tipo d atos no solo books
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    setUser(JSON.parse(userData));
    fetchUserData(JSON.parse(userData)._id, token);
  }, [navigate]);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(
        `https://bookly-back.onrender.com/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
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
                    Editar Perfil
                  </Button>
                </HStack>

                <HStack gap="6">
                  <VStack align="center">
                    <Text fontWeight="bold">{user.library?.length || 0}</Text>
                    <Text fontSize="sm">Libros Leídos</Text>
                  </VStack>
                  <VStack align="center">
                    <Text fontWeight="bold">{user.tbr?.length || 0}</Text>
                    <Text fontSize="sm">Por Leer</Text>
                  </VStack>
                  <VStack align="center">
                    <Text fontWeight="bold">{user.followers?.length || 0}</Text>
                    <Text fontSize="sm">Seguidores</Text>
                  </VStack>
                  <VStack align="center">
                    <Text fontWeight="bold">{user.following?.length || 0}</Text>
                    <Text fontSize="sm">Siguiendo</Text>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </Card.Body>
        </Card.Root>
    </ProfileContainer>
  );
};


export default Profile;
