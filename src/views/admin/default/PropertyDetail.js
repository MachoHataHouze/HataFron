import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  Icon,
  Flex,
  Divider,
  Button,
  Spinner
} from "@chakra-ui/react";
import { FaBath, FaBed, FaRulerCombined, FaDollarSign, FaHome, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

export default function PropertyDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5135/api/Property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("There was an error fetching the property details!", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/api/Review/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("There was an error fetching the reviews!", error);
      }
    };

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/api/Review/top?topN=10`);
        const propertyRating = response.data.find(item => item.propertyId === id);
        if (propertyRating) {
          setAverageRating(propertyRating.averageRating);
        }
      } catch (error) {
        console.error("There was an error fetching the average rating!", error);
      }
    };

    fetchProperty();
    fetchReviews();
    fetchAverageRating();
  }, [id]);

  if (!property) {
    return <Flex justify="center" align="center" h="100vh"><Spinner size="xl" /></Flex>;
  }

  const handleBookNow = () => {
    history.push(`/booking/${id}`);
  };

  const handleWriteReview = () => {
    history.push(`/write-review/${id}`);
  };

  return (
    <Box pt={{ base: "100px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px", xl: "60px" }}>
      <Box 
        bg={boxBg} 
        borderRadius="lg" 
        overflow="hidden" 
        boxShadow="lg"
        mb="20px"
      >
        <Image
          src={`data:image/jpeg;base64,${property.photo}`}
          alt={property.address}
          width="100%"
          height={{ base: "200px", md: "400px" }}
          objectFit="cover"
        />
        <Box p={{ base: "20px", md: "40px" }}>
          <Heading size="lg" color={brandColor}>{property.address}</Heading>
          <HStack spacing="4" mt="4">
            <Text fontSize="lg" color="gray.600">{property.description}</Text>
            {averageRating && (
              <HStack>
                <Icon as={FaStar} w={5} h={5} color="yellow.500" />
                <Text fontSize="lg">{averageRating}</Text>
              </HStack>
            )}
          </HStack>
          <Divider my="6" />
          <VStack align="start" spacing="4">
            <HStack>
              <Icon as={FaHome} w={5} h={5} color={brandColor} />
              <Text fontSize="md">Type: <Badge colorScheme="teal">{property.propertyType}</Badge></Text>
            </HStack>
            <HStack>
              <Icon as={FaRulerCombined} w={5} h={5} color={brandColor} />
              <Text fontSize="md">Area: {property.area} sqft</Text>
            </HStack>
            <HStack>
              <Icon as={FaBed} w={5} h={5} color={brandColor} />
              <Text fontSize="md">Rooms: {property.rooms}</Text>
            </HStack>
            <HStack>
              <Icon as={FaBath} w={5} h={5} color={brandColor} />
              <Text fontSize="md">Bathrooms: {property.bathrooms}</Text>
            </HStack>
            <HStack>
              <Icon as={FaDollarSign} w={5} h={5} color={brandColor} />
              <Text fontSize="md">Price: ${property.price}</Text>
            </HStack>
            <HStack>
              <Text fontSize="md">Furnished: <Badge colorScheme={property.hasFurniture ? "green" : "red"}>{property.hasFurniture ? 'Yes' : 'No'}</Badge></Text>
            </HStack>
            <HStack>
              <Text fontSize="md">Internet: <Badge colorScheme={property.hasInternet ? "green" : "red"}>{property.hasInternet ? 'Yes' : 'No'}</Badge></Text>
            </HStack>
          </VStack>
          <Button mt="6" colorScheme="teal" onClick={() => setShowReviews(!showReviews)}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </Button>
          {showReviews && (
            <Box mt="6">
              <Heading size="md">Reviews</Heading>
              {reviews.length > 0 ? (
                <VStack align="start" spacing="4" mt="4">
                  {reviews.map(review => (
                    <Box key={review.id} p="4" bg={boxBg} borderRadius="md" boxShadow="sm">
                      <Text fontWeight="bold">Rating: {review.rating}</Text>
                      <Text>{review.comment}</Text>
                      <Text fontSize="sm" color="gray.500">Date: {new Date(review.dateCreated).toLocaleDateString()}</Text>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text mt="4">No reviews available.</Text>
              )}
            </Box>
          )}
          <Button mt="6" colorScheme="blue" onClick={handleBookNow}>
            Book Now
          </Button>
          <Button mt="6" colorScheme="green" onClick={handleWriteReview}>
            Write a Review
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
