import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5217/api/Chat/chats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setChats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (userId) => {
    history.push(`/chat/${userId}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box p="6">
      <VStack align="start">
        <Text fontSize="2xl" mb="4">Your Chats</Text>
        {chats.map((chat, index) => (
          <Button key={index} onClick={() => handleChatClick(chat.userId)}>
            {chat.otherUserName}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default ChatList;


