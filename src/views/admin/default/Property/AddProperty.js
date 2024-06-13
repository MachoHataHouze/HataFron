import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddProperty = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [hasInternet, setHasInternet] = useState(false);
  const [hasFurniture, setHasFurniture] = useState(false);
  const [photo, setPhoto] = useState(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Address", address);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Rooms", rooms);
    formData.append("Bathrooms", bathrooms);
    formData.append("Area", area);
    formData.append("PropertyType", propertyType);
    formData.append("HasInternet", hasInternet);
    formData.append("HasFurniture", hasFurniture);
    formData.append("Photo", photo);

    try {
      const response = await axios.post("http://localhost:5135/api/Property", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      toast({
        title: "Property added.",
        description: `Property ID: ${response.data.id}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("There was an error adding the property!", error);
      toast({
        title: "Error",
        description: "There was an error adding the property.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="address" isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Enter the address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" isRequired mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="price" isRequired mt={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput value={price} onChange={(valueString) => setPrice(valueString)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="rooms" isRequired mt={4}>
          <FormLabel>Rooms</FormLabel>
          <NumberInput value={rooms} onChange={(valueString) => setRooms(valueString)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="bathrooms" isRequired mt={4}>
          <FormLabel>Bathrooms</FormLabel>
          <NumberInput value={bathrooms} onChange={(valueString) => setBathrooms(valueString)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="area" isRequired mt={4}>
          <FormLabel>Area</FormLabel>
          <NumberInput value={area} onChange={(valueString) => setArea(valueString)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="propertyType" isRequired mt={4}>
          <FormLabel>Property Type</FormLabel>
          <Input
            placeholder="Enter the property type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center" mt={4}>
          <FormLabel htmlFor="internet-switch" mb="0">
            Has Internet
          </FormLabel>
          <Switch
            id="internet-switch"
            isChecked={hasInternet}
            onChange={(e) => setHasInternet(e.target.checked)}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center" mt={4}>
          <FormLabel htmlFor="furniture-switch" mb="0">
            Has Furniture
          </FormLabel>
          <Switch
            id="furniture-switch"
            isChecked={hasFurniture}
            onChange={(e) => setHasFurniture(e.target.checked)}
          />
        </FormControl>
        <FormControl id="photo" isRequired mt={4}>
          <FormLabel>Photo</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Add Property
        </Button>
      </form>
    </Box>
  );
};

export default AddProperty;
