
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
} from "@chakra-ui/react";
import { FaSave, FaArrowLeft, FaCamera } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";

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
  const [error, setError] = useState("");


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
      setError("Username is required");
      return false;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        setError("New password must be at least 8 characters");
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords don't match");
        return false;
      }

      if (!formData.currentPassword) {
        setError("Current password is required to change password");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
       console.log("FormData content:");
       for (let [key, value] of updateData.entries()) {
         console.log(`${key}:`, value);
       }
      const result = await updateUser(authUser._id, updateData);

      if (result) {
        console.log("Profile updated successfully!", result);

        //actualizar contexto
        const token = result.token;

        if(token){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", token);
            login(result.user || result, token);
            console.log("result user vs authUser", authUser)
        }
        

        //redirigir
        setTimeout(() => {
          navigate(`/profile/${result.user._id}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Error updating profile");
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
      <Card.Root>
        <Card.Header>
          <HStack justify="space-between" align="center">
            <Button
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              onClick={() => navigate(`/profile/${authUser._id}`)}
            >
              Back to Profile
            </Button>
            {/* <Text fontSize="xl" fontWeight="bold">
              Edit Profile
            </Text> */}
            <Box width="40px" /> {/* Spacer para alineación */}
          </HStack>
        </Card.Header>

        <Card.Body>
          {error && (
            <Alert.Root status="error" mb="4">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}

          {/* {success && (
            <Alert.Root status="success" mb="4">
              <Alert.Indicator />
              <Alert.Title>{success}</Alert.Title>
            </Alert.Root>
          )} */}

          <form onSubmit={handleSubmit}>
            <VStack gap="6">
              {/* Foto de perfil */}
              <Field.Root>
                <Field.Label textAlign="center">Profile Picture</Field.Label>
                <VStack gap="3">
                  <Avatar.Root size="xl" position="relative">
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
                />
              </Field.Root>
              <Card.Root variant="outline" width="100%">
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
                      />
                    </Field.Root>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <HStack gap="4" width="100%" justify="flex-end">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/profile/${authUser._id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorPalette="purple"
                  leftIcon={<FaSave />}
                  loading={updating}
                >
                  Save Changes
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
