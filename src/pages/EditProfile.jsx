
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  Avatar,
  VStack,
  HStack,
  Input,
  Field,
  Button,
  Alert,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { FaSave, FaArrowLeft, FaCamera, FaEdit } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { toaster } from "../components/ui/toaster";

const EditProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const EditProfile = () => {
  const navigate = useNavigate();
  const { user: authUser, login, loading: authLoading } = useAuth();
  const { updateUser, loading: updating } = useBooklyApi.useUpdateUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPreviewImage(authUser.profilePic || "");
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      // crea preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      
      toaster.create({
        title: "Validation Error",
        description: "Username is required",
        type: "error",
      });
      return false;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        
        toaster.create({
          title: "Validation Error",
          description: "New password must be at least 8 characters",
          type: "error",
        });
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        
        toaster.create({
          title: "Validation Error",
          description: "New passwords don't match",
          type: "error",
        });
        return false;
      }

      if (!formData.currentPassword) {
        
        toaster.create({
          title: "Validation Error",
          description: "Current password is required to change password",
          type: "error",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if (!validateForm()) return;

    try {
      const updateData = new FormData();
      updateData.append("username", formData.username);

      if (formData.newPassword) {
        updateData.append("password", formData.newPassword);
        updateData.append("currentPassword", formData.currentPassword);
      }

      if (profilePic) {
        updateData.append("profilePic", profilePic);
      }

      const result = await updateUser(authUser._id, updateData);

      if (result) {

        toaster.create({
          title: "Profile Updated!",
          description: "Your profile has been updated successfully",
          type: "success",
        });

        //actualizar contexto
        const token = result.token;

        if(token){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", token);
            login(result.user || result, token);

        }
        

        //redirigir
        setTimeout(() => {
          navigate(`/profile/${result.user._id}`);
        }, 2000);
      }
    } catch (error) {

      toaster.create({
        title: "Update Failed",
        description: error.message || "Error updating profile",
        type: "error",
      });
    }
  };

  if (authLoading) {
    return (
      <Box display="flex" justifyContent="center" padding="8">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <EditProfileContainer>
      <Card.Root bg="brand.900">
        <Card.Header>
          <Heading size="2xl" color="brand.500">
            <HStack spacing={2}>
              <Text>Edit Profile</Text>
              <FaEdit />
            </HStack>
          </Heading>
        </Card.Header>

        <Card.Body>

          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              <Field.Root>
                <Field.Label textAlign="center">Profile Picture</Field.Label>
                <VStack gap="3">
                  <Avatar.Root size="xl" alignSelf="start" position="relative">
                    <Avatar.Fallback name={formData.username} />
                    <Avatar.Image
                      src={previewImage || authUser.profilePic}
                      alt={formData.username}
                    />
                    <label htmlFor="profilePic" style={{ cursor: "pointer" }}>
                      <Box
                        position="absolute"
                        bottom="0"
                        right="0"
                        bg="purple.500"
                        color="white"
                        p="2"
                        borderRadius="full"
                        _hover={{ bg: "purple.600" }}
                      >
                        <FaCamera />
                      </Box>
                    </label>
                  </Avatar.Root>
                  <Input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    display="none"
                  />
                  <Text fontSize="sm" color="fg.muted">
                    Click the camera icon to change your profile picture
                  </Text>
                </VStack>
              </Field.Root>

              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  borderColor="brand.700"
                />
              </Field.Root>
              <Card.Root
                bg="brand.900"
                variant="outline"
                borderColor="brand.700"
                width="100%"
              >
                <Card.Header>
                  <Text fontWeight="semibold">Change Password (Optional)</Text>
                </Card.Header>
                <Card.Body>
                  <VStack gap="4">
                    <Field.Root>
                      <Field.Label>Current Password</Field.Label>
                      <Input
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                        borderColor="brand.700"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>New Password</Field.Label>
                      <Input
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password (min 8 characters)"
                        borderColor="brand.700"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Confirm New Password</Field.Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        borderColor="brand.700"
                      />
                    </Field.Root>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <HStack gap="4" width="100%" justify="flex-end">
                <Button
                  variant="outline"
                  bg="brand.800"
                  color="brand.100"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  onClick={() => navigate(`/profile/${authUser._id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg="brand.800"
                  color="brand.100"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  loading={updating}
                >
                  Save Changes
                  {/* <FaSave /> para version movil*/}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>
    </EditProfileContainer>
  );
};

export default EditProfile;
