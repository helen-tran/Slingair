import React from "react";
import styled from "styled-components";

import LogoSlingair from "../assets/Logo.svg";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <Wrapper>
    <PageWrapper>
      <Page to="">Contact Us</Page>
      <Page to="">About</Page>
      <Page to="/view-reservation">Reservation</Page>
      <Page to="">Profile</Page>
    </PageWrapper>
    <Logo src={LogoSlingair} />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 40px;
  border-top: 2px solid var(--color-blue);
  padding-bottom: 40px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  display: flex;
  align-items: flex-end
  height: 100%;
  margin-right: 40px;
  width: 600px;

`;

const Page = styled(NavLink)`
  font-weight: 300;
  font-family: hobeaux, sans-serif;
  font-size: 26px;
  text-decoration: none;
  color: var(--color-blue);
  margin-left: 40px;
  padding-top: 40px;
`;

export default Footer;
