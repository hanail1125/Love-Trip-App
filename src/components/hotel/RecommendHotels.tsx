import addDelimiter from '@/utils/addDelimiter';
import { css } from '@emotion/react';
import { useState } from 'react';
import Button from '../shared/Button';
import ListRow from '../shared/ListRow';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import useRecommendHotels from './hooks/useRecommendHotels';

function RecommendHotels({ recommendHotels }: { recommendHotels: string[] }) {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels });
  const [showMore, setShowMore] = useState(false);

  if (data == null || isLoading) {
    return null;
  }

  const 추천호텔리스트 = data.length < 3 || showMore ? data : data.slice(0, 3);

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold={true} typography="t4" css={textStyles}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {추천호텔리스트.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={<img src={hotel.mainImageUrl} alt="" css={imageStyles} />}
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px' }}>
          <Button
            full={true}
            weak={true}
            onClick={() => {
              setShowMore(true);
            }}
            css={showMoreBtn}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const textStyles = css`
  margin-left: 24px;
`;

const showMoreBtn = css`
  padding: 5px 24px;
  margin-top: 16px;
`;

export default RecommendHotels;
