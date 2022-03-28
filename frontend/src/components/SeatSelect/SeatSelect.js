import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import Plane from "./Plane";
import Confirmation from "../Confirmation";

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
  // console.log(flights, "flights");

  return (
    <Wrapper>
      <DropDown
        flights={flights}
        flightNumber={flightNumber}
        setFlightNumber={setFlightNumber}
        setInfo={setInfo}
        info={info}
      />
      {subStatus === "idle" ? (
        <>
          <Title>Select your seat and Provide your information!</Title>
          <Plane
            flightNumber={flightNumber}
            setSubStatus={setSubStatus}
            info={info}
            setInfo={setInfo}
            subStatus={subStatus}
          />
        </>
      ) : (
        <Confirmation info={info} />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`;
export default SeatSelect;
