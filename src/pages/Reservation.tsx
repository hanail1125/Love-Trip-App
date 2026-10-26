import Form from '@/components/reservation/Form';
import UseReservation from '@/components/reservation/hooks/useReservation';
import Summary from '@/components/reservation/Summary';
import Spacing from '@/components/shared/Spacing';
import useUser from '@/hooks/auth/useUser';
import addDelimiter from '@/utils/addDelimiter';
import {parse} from 'qs';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ReservationPage() {
  const user = useUser();
  const navigate = useNavigate();

  const [{startDate, endDate, nights, roomId, hotelId}] = useState(
    () =>
      parse(window.location.search, {
        ignoreQueryPrefix: true,
      }) as {
        startDate: string;
        endDate: string;
        nights: string;
        roomId: string;
        hotelId: string;
      },
  );

  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null;
      })
    ) {
      window.history.back();
    }
  }, [user, startDate, endDate, nights, roomId, hotelId]);

  const {data, isLoading, makeReservation} = UseReservation({
    hotelId,
    roomId,
  });

  if (data == null || isLoading === true) {
    return null;
  }

  const {hotel, room} = data;

  const handleSubmit = async (formValues: {[key: string]: string;}) => {
    console.log('formValues ===>', formValues);
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };

    await makeReservation(newReservation);

    navigate(
      `/reservation/done?hotelName=${encodeURIComponent(hotel.name)}`,
    );
  };

  const buttonLabel = `${nights}박 ${Number(nights) + 1}일 ${addDelimiter(room.price * Number(nights))}원 예약하기`;

  return (
    <>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={1} backgroundColor="gray100" />
      <Form
        onSubmit={handleSubmit}
        forms={hotel.forms}
        buttonLabel={buttonLabel}
      />
    </>
  );
}

export default ReservationPage;
