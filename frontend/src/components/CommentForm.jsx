import { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';

export default function CommentForm({ postId, onComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getAuth().currentUser; // get the current authenticated user
    if (comment.trim() && user) {
      const idToken = await user.getIdToken(); // get firebase token

      // send comment to backend 
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, 
        },
        body: JSON.stringify({ message: comment }),
      });

      if (res.ok) {
        onComment(); // refresh the comments after submission
        setComment(''); // clear the comment input field
      } else {
        console.error('failed to add comment');
      }
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={2}>
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        size="sm"
        mb={2}
      />
      <Button type="submit" size="sm" colorScheme="green">Comment</Button>
    </Box>
  );
}
