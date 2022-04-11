import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Plane from "./Plane";
import Confirmation from "../Confirmation";
import Airplane from "/Users/helen-tran/Documents/Concordia-Bootcamp/Portfolio/Slingair/frontend/src/assets/Airplane.jpg";
import Passport from "/Users/helen-tran/Documents/Concordia-Bootcamp/Portfolio/Slingair/frontend/src/assets/Passport.jpg";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";

const SeatSelect = () => {
  const [subStatus, setSubStatus] = useState("idle");
  const [flights, setFlights] = useState(null);
  const [flightNumber, setFlightNumber] = useState(null);
  const [info, setInfo] = useState({
    givenName: "",
    surname: "",
    email: "",
    flight: "",
    seat: "",
    id: null,
  });
  useEffect(() => {
    fetch("/api/flights", {
      headers: {
        Accept: "application.json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlights(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Wrapper>
        {subStatus === "idle" ? (
          <>
            <Plane
              flightNumber={flightNumber}
              setSubStatus={setSubStatus}
              info={info}
              setInfo={setInfo}
              subStatus={subStatus}
              setFlightNumber={setFlightNumber}
              flights={flights}
              setFlights={setFlights}
            />
          </>
        ) : (
          <Confirmation info={info} />
        )}
      </Wrapper>
      <BottomWrapper>
        <BoxWrapper to="/view-reservation">
          <Img src={Airplane} />
          <WrapperTitle>
            <PageTitle>Reservation</PageTitle>
          </WrapperTitle>
        </BoxWrapper>
        <BoxWrapper to="/profile">
          <Img src={Passport} />
          <WrapperTitle>
            <PageTitle>Profile</PageTitle>
          </WrapperTitle>
        </BoxWrapper>
      </BottomWrapper>
    </>
  );
};
const Wrapper = styled.div``;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const BoxWrapper = styled(NavLink)`
  margin-top: 50px;
  border: 2px solid var(--color-blue);
  border-radius: 30px;
  margin-right: 40px;
  width: 45%;
  text-decoration: none;
`;
const PageTitle = styled.div`
  font-size: 50px;
  text-transform: uppercase;
  font-family: "Hobeaux";
  color: var(--color-blue);
  font-weight: 900;
  text-align: center;
`;
const Img = styled.img`
  width: 100%;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
`;
const WrapperTitle = styled.div`
  background: white;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
export default SeatSelect;
