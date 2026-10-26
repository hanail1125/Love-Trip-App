import {colors} from '@styles/colorPalette';
import {css} from '@emotion/react';
import {useCallback} from 'react';
import Button from './Button';
import Flex from './Flex';
import {Link, useLocation} from 'react-router-dom';
import useUser from '@hooks/auth/useUser';
import getProfileImageUrl from '@utils/getProfileImageUrl';
import Spacing from './Spacing';

const Navbar = () => {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user !== null) {
      return (
        <Flex align={'center'}>
          <Link to="/my">
            <img
              src={getProfileImageUrl(user.photoURL)}
              alt="유저의 이미지"
              width={40}
              height={40}
              style={{borderRadius: '100%'}}
              referrerPolicy="no-referrer"
            />
          </Link>
          <Spacing size={8} direction={'horizontal'} />
          <Link to="/settings">
            <img
              src={'https://cdn-icons-png.freepik.com/512/1103/1103621.png'}
              alt=""
              width={38}
              height={38}
              style={{borderRadius: '100%'}}
            />
          </Link>
        </Flex>
      );
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex css={navbarContaninerStyle}>
      <Link to="/">Love Trip</Link>
      {renderButton()}
    </Flex>
  );
};

const navbarContaninerStyle = css`
  padding: 0 24px;
  height: 65px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.brightGray};
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  font-weight: bold;
  font-size: 20px;
  color: #951235;
`;

export default Navbar;
