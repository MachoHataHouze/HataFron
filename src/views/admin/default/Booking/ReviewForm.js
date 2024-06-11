import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  Select,
  VStack,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

const ReviewForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const bg = useColorModeValue('white', 'gray.700'); // Вызов useColorModeValue вынесен наверх

  const handleReviewSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to write a review.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        'http://localhost:5051/api/Review',
        {
          propertyId: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Review submitted successfully!');
      setIsLoading(false);

      // Перенаправление на страницу с деталями недвижимости после успешного отзыва
      history.push(`/property/${id}`);
    } catch (error) {
      console.error('Review submission error:', error.response ? error.response.data : error.message);
      setError('Review submission failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Box
      pt={{ base: '100px', md: '80px', xl: '80px' }}
      px={{ base: '20px', md: '40px', xl: '60px' }}
    >
      <Box
        bg={bg}
        borderRadius="lg"
        p={{ base: '20px', md: '40px' }}
        boxShadow="lg"
      >
        <Heading size="lg" mb="6">
          Write a Review
        </Heading>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Rating</FormLabel>
            <Select
              placeholder="Select rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Comment</FormLabel>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Button
            colorScheme="blue"
            onClick={handleReviewSubmit}
            isLoading={isLoading}
          >
            Submit Review
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ReviewForm;
