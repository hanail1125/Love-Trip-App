import { getReservations } from '@remote/reservation';
import useUser from '@hooks/auth/useUser';
import { useQuery } from 'react-query';

export default function UseReservations() {
  const user = useUser();

  const { data, isLoading } = useQuery(
    ['reservations', user?.uid],
    () => getReservations({ userId: user?.uid as string }),
    { enabled: user != null },
  );

  return { data, isLoading };
}
