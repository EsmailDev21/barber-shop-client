import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';

export default function useRole() {
  const userData = useAppSelector(selectAuthState).data;

  return userData.role;
}
