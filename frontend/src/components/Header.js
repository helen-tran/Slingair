import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import LogoSlingair from "../assets/Logo.svg";

const Header = () => (
  <Wrapper>
    <Logo to="/">
      <LogoImage src={LogoSlingair} />
      <TagLine>The only way to fly!</TagLine>
    </Logo>
    <Nav>
      <>
        <StyledNavLink to="/view-reservation">Reservation</StyledNavLink>
        <StyledNavLink to="">Profile</StyledNavLink>
      </>
    </Nav>
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: 110px;
  padding: var(--padding-page) 18px;
`;
const Logo = styled(NavLink)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;
const LogoImage = styled.img`
  width: 800px;
  height: auto;
`;
const TagLine = styled.p`
  color: var(--color-blue);
  padding-top: 20px;
  font-size: 30px;
  font-weight: 400;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;
  color: var(--color-blue);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    font-weight: 600;
  }
`;

export default Header;
