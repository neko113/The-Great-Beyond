// react
import { useRouter } from 'next/router';

// hookes
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles/mediaQuery';
import { Button } from '~/components/common';
import HeaderDropdown from '~/components/base/HeaderDropdown';
import Link from 'next/link';

const DesktopHeader = () => {
  const user = useUser();
  const router = useRouter();

  return (
    <Container>
      <Logo href="/">Emotions</Logo>
      <HeaderItems>
        {user ? (
          <>
            <Button shadow size="sm" onClick={() => router.push('/write')}>
              Write Post
            </Button>
            <HeaderDropdown />
          </>
        ) : (
          <Button
            shadow
            color="primary"
            size="sm"
            onClick={() => router.push('/setting')}
          >
            Login
          </Button>
        )}
      </HeaderItems>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: none;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  background: #000;

  ${mediaQuery.mobile} {
    display: flex;
  }
`;

const Logo = styled(Link)`
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 10px;
  color: #fff;
  padding: 0 16px;
`;

const HeaderItems = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;

export default DesktopHeader;