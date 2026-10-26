import useUser from '@hooks/auth/useUser';
import getProfileImageUrl from '@utils/getProfileImageUrl';
import { format } from 'date-fns';
import { ChangeEvent, useCallback, useState } from 'react';
import Button from '../shared/Button';
import Flex from '../shared/Flex';
import ListRow from '../shared/ListRow';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextLabel';
import UseReview from './hooks/useReview';

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading, write, remove } = UseReview({ hotelId });
  const user = useUser();
  const [text, setText] = useState('');

  const reviewRows = useCallback(() => {
    if (reviews == null || reviews.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn-icons-png.magnific.com/512/2190/2190550.png?ga=GA1.1.2039400138.1778518111"
            style={{ width: '70px' }}
            alt=""
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </Text>
        </Flex>
      );
    }

    return (
      <ul>
        {reviews.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL !== null ? (
                <img
                  src={getProfileImageUrl(review.user.photoURL)}
                  alt=""
                  width={40}
                  height={40}
                  referrerPolicy="no-referrer"
                />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-ddd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() => {
                    const ok = window.confirm('정말 삭제하시겠습니까?');
                    if (!ok) return;

                    remove({
                      reviewId: review.id,
                      hotelId: review.hotelId,
                    });
                  }}
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    );
  }, [reviews, user, remove]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user !== null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify={'flex-end'}>
            <Button
              disabled={text === ''}
              onClick={async () => {
                const success = await write(text);

                if (success === true) {
                  setText('');
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}

export default Review;
