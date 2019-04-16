import * as React from 'react';
import { Link } from 'react-router-dom';
import { Home, AccountCircle, ExitToApp } from '@material-ui/icons';
import styled from '@emotion/styled';

import routeUrls from '../../../configs/routeUrls';
import session from '../../../utils/session';
import helpers from '../../../utils/helpers';

const HeaderWrapper = styled.header`
  height: 64px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ccc;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const HomeIcon = styled(Home)`
  font-size: 40px !important;
  color: #000;
  margin-right: 18px;
  cursor: pointer;
` as typeof Home;

const ProfileIcon = styled(AccountCircle)`
  font-size: 40px !important;
  color: #000;
  cursor: pointer;
` as typeof AccountCircle;

const LogOutIcon = styled(ExitToApp)`
  font-size: 40px !important;
  color: #000;
  position: absolute;
  right: 16px;
  cursor: pointer;
` as typeof ExitToApp;

type Props = {};

const Header = ({  }: Props) => {
  const isAuthenticated = session.isTokenSet();

  return isAuthenticated ? (
    <HeaderWrapper>
      <Nav>
        <Link to={routeUrls.home}>
          <HomeIcon />
        </Link>
        <Link to={routeUrls.profile}>
          <ProfileIcon />
        </Link>
        <LogOutIcon onClick={helpers.logOut} />
      </Nav>
    </HeaderWrapper>
  ) : null;
};

export default Header;
