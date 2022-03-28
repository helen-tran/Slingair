import React from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = ({ info }) => {
  const firstName =
    info.givenName.charAt(0).toUpperCase() + info.givenName.slice(1);
  const lastName = info.surname.charAt(0).toUpperCase() + info.surname.slice(1);

  return (
    <PageWrapper>
      {info.id && (
        <Wrapper>
          <Title>Your flight is confirmed!</Title>
          <Line></Line>
          <WrapperInfo>
            <TextInfo>Reservation #: {info.id}</TextInfo>
            <TextInfo>Flight #: {info.flight}</TextInfo>
            <TextInfo>Seat #: {info.seat}</TextInfo>
            <TextInfo>
              Name: {firstName} {lastName}
            </TextInfo>
            <TextInfo>Email: {info.email}</TextInfo>
          </WrapperInfo>
        </Wrapper>
      )}
      <Image src={tombstone} />
    </PageWrapper>
  );
};
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const WrapperInfo = styled.div`
  margin-top: 50px;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -250px;
  border: 3px solid var(--color-alabama-crimson);
  width: 500px;
  height: 300px;
  border-radius: 10px;
`;
const Title = styled.p`
  color: var(--color-alabama-crimson);
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Line = styled.hr`
  border-bottom: 3px solid var(--color-alabama-crimson);
`;
const TextInfo = styled.p`
  margin-left: 30px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
`;
const Image = styled.img`
  width: 150px;
  position: fixed;
  bottom: 90px;
`;
export default Confirmation;
