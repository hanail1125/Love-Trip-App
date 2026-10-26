import HotelFormAddButton from '@/components/test/HotelFormAddButton';
import HotelListAddButton from '@/components/test/HotelListAddButton';
import RecommendHotelButton from '@/components/test/RecommendHotelButton';

const TestPage = () => {
  return (
    <div
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <HotelListAddButton />
      <RecommendHotelButton />
      <HotelFormAddButton />
    </div>
  );
};

export default TestPage;
