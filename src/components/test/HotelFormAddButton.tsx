import { COLLECTIONS } from '@/constants';
import { FORMS } from '@/data/HotelData';
import { store } from '@/remote/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import Button from '../shared/Button';

function HotelFormAddButton() {
  const hendleButtonClick = async () => {
    const batch = writeBatch(store);
    const snapshots = await getDocs(collection(store, COLLECTIONS.HOTEL));

    snapshots.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      });
    });

    await batch.commit();

    alert('폼 데이터 추가 완료!');
  };

  return <Button onClick={hendleButtonClick}>호텔 폼 데이터 추가</Button>;
}

export default HotelFormAddButton;
