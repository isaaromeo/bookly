// src/components/AdminTools.jsx
import { useState } from "react";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Button,
  Alert,
  Progress,
  Field,
  Input,
  Badge,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { FaUpload, FaFileCsv, FaTrash, FaTools, FaEdit } from "react-icons/fa";
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";

const AdminToolsContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  backround: brand.900;
`;

const AdminTools = () => {
  const { user: authUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadBooksCSV, loading: uploadLoading, error, data } = useBooklyApi.useUploadBooksCSV();


  if (!authUser || authUser.rol !== "admin") {
    <Box textAlign="center" py="8">
      <Text fontSize="lg" color="fg.muted">
        No Authorization!
      </Text>
    </Box>;
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);

      } else {
        alert("Please select a CSV file");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("csvFile", selectedFile);

      await uploadBooksCSV(formData)

      setSelectedFile(null);
      document.getElementById("csv-upload").value = "";

    } catch (error) {
      console.error("Upload error:", error);
  };
}

  const clearFile = () => {
    setSelectedFile(null);
    document.getElementById("csv-upload").value = "";
  };

  return (
    <AdminToolsContainer>
      <Card.Root bg="brand.900">
        <Card.Header>
          <Heading size="2xl" color="brand.500">
            <HStack spacing={2}>
              <Text>Admin Tools</Text>
              <FaTools />
              <Badge colorPalette="purple">Admin</Badge>
            </HStack>
          </Heading>
        </Card.Header>

        <Card.Body>
          <VStack gap="4" align="stretch">
            <Text color="fg.muted">
              Upload a CSV file to bulk import books into the database.
            </Text>

            <Field.Root>
              <Field.Label>Select CSV File</Field.Label>
              <Input
                id="csv-upload"
                type="file"
                accept=".csv"
                borderColor="brand.700"
                paddingTop="6px"
                onChange={handleFileSelect}
              />

              <Field.HelperText>
                CSV format should include: title, author, isbn, sinopsis, pages,
                genres, cover, rating
              </Field.HelperText>
            </Field.Root>

            {selectedFile && (
              <Card.Root variant="outline">
                <Card.Body>
                  <HStack justify="space-between" align="center">
                    <HStack gap="3">
                      <FaFileCsv />
                      <VStack align="start" gap="0">
                        <Text fontWeight="semibold">{selectedFile.name}</Text>
                        <Text fontSize="sm" color="fg.muted">
                          {selectedFile.size / 1024} KB
                        </Text>
                      </VStack>
                    </HStack>
                    <IconButton size="sm" variant="ghost" onClick={clearFile}>
                      <FaTrash />
                    </IconButton>
                  </HStack>
                </Card.Body>
              </Card.Root>
            )}
            <Button
              variant="outline"
              bg="brand.800"
              color="brand.100"
              _hover={{
                boxShadow: "sm",
                borderColor: "brand.500",
              }}
              onClick={handleUpload}
              loading={uploadLoading}
              // disabled={!selectedFile || uploadLoading}
            >
              Upload Books CSV
              <FaUpload />
            </Button>

            {error && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
              </Alert.Root>
            )}

            {data && data.results && (
              <Card.Root
                variant="outline"
                borderColor={error ? "red.500" : "green.500"}
              >
                <Card.Header>
                  <Text fontWeight="semibold">
                    {error ? "Upload Completed!" : "Upload Failed"}
                  </Text>
                </Card.Header>
                <Card.Body>
                  <VStack gap="2" align="start">
                    <HStack>
                      <Badge colorPalette="green">
                        Added: {data.results.added}
                      </Badge>
                      <Badge colorPalette="yellow">
                        Skipped: {data.results.skipped}
                      </Badge>
                    </HStack>
                  </VStack>

                  {data.results.errors && data.results.errors.length > 0 && (
                    <VStack gap="2" align="start">
                      <Text color="red.500">
                        Upload failed. Please try again. Errors (
                        {data.results.errors.length}):
                      </Text>
                      <VStack
                        gap="1"
                        align="start"
                        maxHeight="150px"
                        overflowY="auto"
                      >
                        {data.results.errors.map((error, index) => (
                          <Text key={index} fontSize="xs" color="red.500">
                            • {error}
                          </Text>
                        ))}
                      </VStack>
                    </VStack>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearFile}
                    mt="3"
                  >
                    Clear Results
                  </Button>
                </Card.Body>
              </Card.Root>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </AdminToolsContainer>
  );
};

export default AdminTools;
