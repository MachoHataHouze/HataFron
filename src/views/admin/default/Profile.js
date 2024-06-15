import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Stack,
  Spinner,
  Badge,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Button,
} from '@chakra-ui/react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [showContracts, setShowContracts] = useState(false);

  const avatarBg = useColorModeValue('white', 'gray.800');
  const badgeBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.500', 'white');
  const boxBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5054/api/Profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5275/api/Booking/mybookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://localhost:5275/api/Booking/mycontracts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchProfile();
    fetchBookings();
    fetchContracts();
  }, []);

  const downloadBase64File = (base64Data, filename) => {
    const linkSource = `data:application/pdf;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  if (!profile) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" justify="center" align="center" py={12}>
      <Box
        maxW="lg"
        w="full"
        bg={avatarBg}
        boxShadow="lg"
        rounded="lg"
        p={6}
        textAlign="center"
        mb={6}
      >
        <Avatar
          size="xl"
          src={profile.profilePicture}
          alt="Profile Picture"
          mb={4}
          pos="relative"
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize="2xl" fontFamily="body">
          {profile.firstName} {profile.lastName}
        </Heading>
        <Text fontWeight={600} color={textColor} mb={4}>
          Contact: {profile.contactInfo}
        </Text>
        <Stack align="center" justify="center" direction="row" mt={6}>
          <Badge px={2} py={1} bg={badgeBg} fontWeight="400">
            #user
          </Badge>
          <Badge px={2} py={1} bg={badgeBg} fontWeight="400">
            #profile
          </Badge>
          <Badge px={2} py={1} bg={badgeBg} fontWeight="400">
            #settings
          </Badge>
        </Stack>
      </Box>

      <Button onClick={() => setShowBookings(!showBookings)} mb={6}>
        {showBookings ? 'Hide My Bookings' : 'Show My Bookings'}
      </Button>

      {showBookings && (
        <Box w="full" maxW="lg" bg={boxBg} boxShadow="lg" rounded="lg" p={6} mb={6}>
          <Heading fontSize="xl" mb={4}>My Bookings</Heading>
          <VStack spacing={4} divider={<Divider borderColor={borderColor} />}>
            {bookings.map((booking) => (
              <Box key={booking.id} w="full" p={4} borderWidth={1} borderRadius="lg">
                <HStack justify="space-between">
                  <Box>
                    <Text fontWeight="bold">Property ID:</Text>
                    <Text>{booking.propertyId}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Total Price:</Text>
                    <Text>${booking.totalPrice}</Text>
                  </Box>
                </HStack>
                <HStack justify="space-between" mt={2}>
                  <Box>
                    <Text fontWeight="bold">Start Date:</Text>
                    <Text>{new Date(booking.startDate).toLocaleDateString()}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">End Date:</Text>
                    <Text>{new Date(booking.endDate).toLocaleDateString()}</Text>
                  </Box>
                </HStack>
                <Box mt={2}>
                  <Text fontWeight="bold">Contract:</Text>
                  <Text>{atob(booking.contract)}</Text>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      <Button onClick={() => setShowContracts(!showContracts)} mb={6}>
        {showContracts ? 'Hide My Contracts' : 'Show My Contracts'}
      </Button>

      {showContracts && (
        <Box w="full" maxW="lg" bg={boxBg} boxShadow="lg" rounded="lg" p={6}>
          <Heading fontSize="xl" mb={4}>My Contracts</Heading>
          <VStack spacing={4} divider={<Divider borderColor={borderColor} />}>
            {contracts.map((contract, index) => (
              <Box key={index} w="full" p={4} borderWidth={1} borderRadius="lg">
                <HStack justify="space-between">
                  <Text fontWeight="bold">Contract {index + 1}</Text>
                  <Button
                    colorScheme="teal"
                    onClick={() => downloadBase64File(contract.contract, `contract_${index + 1}.pdf`)}
                  >
                    Download
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Flex>
  );
};

const downloadBase64File = (base64Data, filename) => {
    const linkSource = `data:application/pdf;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };
  

export default Profile;
