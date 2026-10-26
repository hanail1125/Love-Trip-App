import { getLikes } from '@remote/like';
import { useQuery } from 'react-query';

import useUser from '@hooks/auth/useUser';

function useLike() {
  const user = useUser();
  // const {} = useQuery(['likes'], () => getLikes(), )
}
