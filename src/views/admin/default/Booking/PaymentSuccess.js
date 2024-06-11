import React from 'react';
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const PaymentSuccess = () => {
  return (
    <Box
      pt={{ base: '100px', md: '80px', xl: '80px' }}
      px={{ base: '20px', md: '40px', xl: '60px' }}
    >
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        p={{ base: '20px', md: '40px' }}
        boxShadow="lg"
      >
        <VStack spacing="4">
          <Heading size="lg">Payment Successful</Heading>
          <Text>Your booking has been confirmed and payment was successful. Thank you!</Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
