import { Button } from '@chakra-ui/react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase'; 

export default function LoginLogoutButton({ user, setUser }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);  // set the logged-in user
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);  // clear data
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <Button onClick={user ? handleLogout : handleLogin}>
      {user ? 'Logout' : 'Login with Google'}
    </Button>
  );
}
