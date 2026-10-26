import { COLLECTIONS } from '@constants';
import { store } from '@remote/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import Button from '../shared/Button';

const RecommendHotelButton = () => {
  const handleBottonClick = async () => {
    const batch = writeBatch(store);
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL)); //전체 호텔 데이터 가져오기.

    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = [];

      for (let doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) {
          break;
        }

        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id);
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      });
    });

    await batch.commit();
    alert('업데이트가 완료되었습니다.');
  };

  return <Button onClick={handleBottonClick}>추천 호텔 데이터 추가하기</Button>;
};

export default RecommendHotelButton;
