import useShare from '@hooks/useShare';
import { Hotel } from '@models/hotel';
import Flex from '@shared/Flex';
import Spacing from '@shared/Spacing';
import Text from '@shared/Text';
import { css } from '@emotion/react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useLike from '@hooks/like/useLike';

function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare();
  const { data: likes, mutate: like } = useLike();
  const { name, comment, mainImageUrl, id } = hotel;

  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id));

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={() => {
          like({
            hotel: {
              name,
              mainImageUrl,
              id,
            },
          });
        }}
        iconUrl={
          isLike
            ? 'https://cdn-icons-png.freepik.com/512/4749/4749719.png?uid=R180347339&ga=GA1.1.2025548309.1768199676'
            : 'https://cdn-icons-png.freepik.com/512/1077/1077035.png?uid=R180347339&ga=GA1.1.2025548309.1768199676'
        }
      />
      <Button
        label="공유하기"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Love Trip 에서 보기',
          });
        }}
        iconUrl={'https://cdn-icons-png.freepik.com/256/3991/3991999.png'}
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크주소가 복사되었습니다.');
        }}
      >
        <Button
          label="링크복사"
          iconUrl={'https://cdn-icons-png.freepik.com/256/14871/14871291.png'}
        />
      </CopyToClipboard>
    </Flex>
  );
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string;
  iconUrl: string;
  onClick?: () => void;
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;
  & * {
    flex: 1;
  }
`;

export default ActionButtons;
