import Button from '@shared/Button';
import Flex from '@shared/Flex';
import Spacing from '@shared/Spacing';
import Text from '@shared/Text';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function ReservationDonePage() {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string;
  };

  const navagate = useNavigate();

  return (
    <>
      <Flex direction="column" align="center">
        <Spacing size={80} />
        <img
          src="https://cdn-icons-png.magnific.com/512/1585/1585610.png?ga=GA1.1.142701321.1788695019"
          alt=""
          width={120}
        />
        <Spacing size={30} />
        <Text typography="t4" bold={true}>
          {hotelName}
        </Text>
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: '24px' }}>
        <Button.Group>
          <Button onClick={() => navagate('/')}>홈으로</Button>
          <Button onClick={() => navagate('/reservation/list')}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </>
  );
}

export default ReservationDonePage;
