import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { useJwt } from 'react-jwt';
export default function useAuth() {
  const authToken = localStorage.getItem('AUTH_TOKEN');
  const { decodedToken, isExpired } = useJwt(authToken);

  return { isExpired, authToken };
}
