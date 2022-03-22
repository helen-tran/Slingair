import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import Plane from "./Plane";
import Confirmation from "../Confirmation";

const SeatSelect = ({}) => {
  const [subStatus, setSubStatus] = useState("idle");
  const [flights, setFlights] = useState(null);
  const [flight, setFlight] = useState(null);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    flightNumber: "",
    seat: "",
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
    <Wrapper>
      <DropDown
        flights={flights}
        flight={flight}
        setFlight={setFlight}
        setInfo={setInfo}
        info={info}
      />
      {subStatus === "idle" ? (
        <>
          <Title>Select your seat and Provide your information!</Title>
          <Plane
            flight={flight}
            setSubStatus={setSubStatus}
            info={info}
            setInfo={setInfo}
            subStatus={subStatus}
          />
        </>
      ) : (
        <Confirmation />
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
