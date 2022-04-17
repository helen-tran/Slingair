import React from "react";
import styled from "styled-components";

const Confirmation = ({ info }) => {
  const firstName =
    info.givenName.charAt(0).toUpperCase() + info.givenName.slice(1);
  const lastName = info.surname.charAt(0).toUpperCase() + info.surname.slice(1);

  return (
    <PageWrapper>
      {info.id && (
        <Wrapper>
          <WrapperInfo>
            <TextInfo>Reservation #: {info.id}</TextInfo>
            <TextInfo>Flight #: {info.flight}</TextInfo>
            <TextInfo>Seat #: {info.seat}</TextInfo>
            <TextInfo>
              Name: {firstName} {lastName}
            </TextInfo>
            <TextInfo>Email: {info.email}</TextInfo>
          </WrapperInfo>
          <TitleWrapper>
            <Title>Your flight is confirmed!</Title>
          </TitleWrapper>
        </Wrapper>
      )}
    </PageWrapper>
  );
};
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 80px;
  margin-bottom: 120px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  border-top: 2px solid var(--color-blue);
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding: 10px 30px 10px 30px;
  width: 100%;
`;
const WrapperInfo = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  border: 2px solid var(--color-blue);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  width: 500px;
  justify-content: center;
`;
const Title = styled.p`
  color: var(--color-blue);
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 900;
  text-transform: uppercase;
`;
const TextInfo = styled.p`
  margin-left: 30px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
`;
export default Confirmation;
