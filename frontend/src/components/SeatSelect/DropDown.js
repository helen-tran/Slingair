import React from "react";
import styled from "styled-components";
const DropDown = ({
  flights,
  flightNumber,
  setFlightNumber,
  info,
  setInfo,
}) => {
  if (!flights) {
    return <div></div>;
  }

  // console.log(flightName, "flightName");
  const handleChange = (e) => {
    setFlightNumber(e.target.value);
    setInfo({ ...info, flight: e.target.value });
  };

  // The flight Number SA231
  // console.log(flightNumber);
  return (
    <Wrapper>
      <Title>Flight Number</Title>
      <WrapperDropDown name="flights" onChange={handleChange}>
        <DropDownItem>Select a flight</DropDownItem>
        {flights.map((flight) => {
          const flightNumber = flight.flightNumber;
          return <DropDownItem>{flightNumber}</DropDownItem>;
        })}
      </WrapperDropDown>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: row;
  background: red;
  align-items: center;
`;
const Title = styled.h2`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 25px;
  margin-right: 30px;
`;

const WrapperDropDown = styled.select`
  height: 30px;
`;
const DropDownItem = styled.option`
  height: 10px;
`;

export default DropDown;
