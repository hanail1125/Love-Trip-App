import useGoogleSignin from '@/hooks/useGoogleSignin';
import Button from '@components/shared/Button';
import Flex from '@components/shared/Flex';
import Spacing from '@components/shared/Spacing';

function SigninPage() {
  const { signin } = useGoogleSignin();

  return (
    <Flex direction="column" align={'center'} style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src="https://cdn-icons-png.freepik.com/512/9217/9217720.png"
        alt=""
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify={'center'}>
          <img
            src="https://img.icons8.com/?size=96&id=17949&format=png"
            alt=""
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={4} /> Google 로그인
        </Flex>
      </Button>
    </Flex>
  );
}

export default SigninPage;
