import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import InputInfo from "./InputInfo";
import Plane from "./Plane";
const SeatSelect = ({}) => {
  const [hasLoaded, setLoaded] = useState(false);
  const [flights, setFlights] = useState(null);
  const [flight, setFlight] = useState(null);
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
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper>
      <DropDown flights={flights} flight={flight} setFlight={setFlight} />
      <Title>Select your seat and Provide your information!</Title>
      <Plane flight={flight} />
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`;
export default SeatSelect;
