import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, FormControl, Input, Button } from '@chakra-ui/react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5217/chathub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('ReceiveMessage', (user, message) => {
            setMessages(messages => [...messages, { user, message }]);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection.connectionStarted) {
      try {
        await connection.send('SendMessage', 'User', message);
        setMessage('');
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {messages.map((msg, index) => (
          <Box key={index} p={2} bg="gray.100" borderRadius="md">
            <Text>{msg.user}: {msg.message}</Text>
          </Box>
        ))}
      </VStack>
      <FormControl mt={4}>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button mt={2} colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default Chat;
