import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ReservationData = ({ seat, resInfo, setResInfo }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetch(`/reservation/${seat}`, {
      headers: {
        Accept: "application.json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResInfo(data.data);
        setHasLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [seat, setResInfo]);

  if (!hasLoaded) {
    return <div></div>;
  }

  return (
    <PageWrapper>
      {resInfo ? (
        <Wrapper>
          <WrapperInfo>
            <TextInfo>Reservation #: {resInfo.id} </TextInfo>
            <TextInfo>Flight #: {resInfo.flight}</TextInfo>
            <TextInfo>Seat #: {resInfo.seat}</TextInfo>
            <TextInfo>Given Name: {resInfo.givenName}</TextInfo>
            <TextInfo>Surname: {resInfo.surname}</TextInfo>
            <TextInfo>Email: {resInfo.email}</TextInfo>
          </WrapperInfo>
          <TitleWrapper>
            <Title>Your reservation information</Title>
          </TitleWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <WrapperInfo>
            <Info>
              You're reservation can't be retreived. Please enter a valid seat
              number.
            </Info>
          </WrapperInfo>
          <TitleWrapper>
            <Button onClick={() => window.location.reload(false)}>
              Click Here to Retry
            </Button>
          </TitleWrapper>
        </Wrapper>
      )}
    </PageWrapper>
  );
};
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const WrapperInfo = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  border: 2px solid var(--color-blue);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-blue);
  font-size: 30px;
  text-align: center;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-blue);
  font-size: 30px;
  text-align: center;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  cursor: pointer;
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
const TextInfo = styled.p`
  margin-left: 30px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  color: var(--color-blue);
`;
const Info = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  color: var(--color-blue);
  padding-left: 15px;
  padding-right: 15px;
`;

export default ReservationData;
