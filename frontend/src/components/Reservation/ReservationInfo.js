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
  }, [seat]);

  if (!hasLoaded) {
    return <div></div>;
  }
  console.log(resInfo);
  const email = resInfo.email;
  const givenName = resInfo.givenName;
  const id = resInfo.id;
  const seatRes = resInfo.seat;
  const surname = resInfo.surname;
  const flight = resInfo.flight;

  return (
    <PageWrapper>
      {hasLoaded && (
        <Wrapper>
          <Title>Your reservation information</Title>
          <Line></Line>
          <WrapperInfo>
            <TextInfo>Reservation #: {id} </TextInfo>
            <TextInfo>Flight #: {flight}</TextInfo>
            <TextInfo>Seat #: {seatRes}</TextInfo>
            <TextInfo>Given Name: {givenName}</TextInfo>
            <TextInfo>Surname: {surname}</TextInfo>
            <TextInfo>Email: {email}</TextInfo>
          </WrapperInfo>
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

export default ReservationData;
