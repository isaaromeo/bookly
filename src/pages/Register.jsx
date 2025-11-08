import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Text,
  Input,
  Field,
  Button,
  VStack,
  HStack,
  Alert,
  Box,
} from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";
import styled from "styled-components";
import { toaster } from "../components/ui/toaster.jsx";
import { useBooklyApi } from "@/hooks/useBooklyApi";

const RegisterContainer = styled.div`
  max-width: 650px;
  width: 60%;
  // margin: 2rem auto;
  padding: 2rem;
  justify-self: center;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    padding: 1rem;
    width: 80%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    margin: 0;
    padding: 1rem;
    width: 100%;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, loading, error } = useBooklyApi.useRegister();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // if (error) setError("");
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      // setError("password must be atleast 8 characters long");
      toaster.create({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        type: "error",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      // setError("password mismacth");
      toaster.create({
        title: "Validation Error",
        description: "Passwords don't match",
        type: "error",
      });
      return false;
    }
    if (!formData.email.includes("@")) {
      // setError("use a valid email");
      toaster.create({
        title: "Validation Error",
        description: "Please use a valid email address",
        type: "error",
      });
      return false;
    }
    if (formData.username.length < 3) {
      // setError("Username must be more than 3 charaters long");
      toaster.create({
        title: "Validation Error",
        description: "Username must be at least 3 characters long",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    try {
      const { confirmPassword, ...registerData } = formData;

      const result = await register(registerData);

      if (result) {
        toaster.create({
          title: "Account Created!",
          description: "Your account has been created successfully",
          type: "success",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      
      toaster.create({
        title: "Registration Failed",
        description: err.message || "Error creating account",
        type: "error",
      });
    }
    // }
  };

  return (
    <RegisterContainer>
      <Card.Root
        bg="brand.900"
        
        
      >
        <Card.Header>
          <Card.Title textAlign="center" fontSize="2xl" color="brand.100">
            Create Account
          </Card.Title>
          <Text textAlign="center" color="fg.muted">
            Join the Bookly community!
          </Text>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit}>
            <VStack gap="4">
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  name="username"
                  placeholder="Your username"
                  value={formData.username}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Confirm Password</Field.Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                width="100%"
                loading={loading}
                bg="brand.800"
                color="brand.100"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
              >
                Create Account
              </Button>
            </VStack>
          </form>

          <Box mt="4" p="4" bg="bg.subtle" borderRadius="md">
            <Text fontSize="sm" fontWeight="semibold" mb="2">
              Account requirements:
            </Text>
            <Text fontSize="sm">• Username (min. 3 characters)</Text>
            <Text fontSize="sm">• Valid email</Text>
            <Text fontSize="sm">• Password (min. 8 characters)</Text>
          </Box>
        </Card.Body>

        <Card.Footer>
          <HStack justify="center" width="100%">
            <Text
              fontSize={{
                base: "sm",
                sm: "md",
                md: "md",
                lg: "xl",
              }}
            >
              Already have an account?
            </Text>
            <Link
              to="/login"
              style={{
                color: "brand.500",
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Log In
            </Link>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </RegisterContainer>
  );
};

export default Register;
