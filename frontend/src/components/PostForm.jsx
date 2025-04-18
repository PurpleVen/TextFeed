import { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';

export default function PostForm({ onPost }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getAuth().currentUser;
    if (message.trim() && user) {
      try {
        const idToken = await user.getIdToken();  // Get Firebase ID token
        
        // Pass the token and message to the backend API
        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`, 
          },
          body: JSON.stringify({ message, user: user.displayName }),
        });

        if (res.ok) {
          onPost();  
          setMessage('');  // Clear the post input field
        } else {
          console.error('Failed to create post');
        }
      } catch (err) {
        console.error('Error creating post', err);
      }
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} shadow="md" borderWidth="1px" borderRadius="xl">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a post..."
        mb={2}
      />
      <Button type="submit" colorScheme="blue">Post</Button>
    </Box>
  );
}
