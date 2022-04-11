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
  align-items: center;
  color: var(--color-blue);
`;
const Title = styled.h2`
  display: flex;
  align-items: center;
  padding: 30px 0 30px 0;
  margin-right: 30px;
  font-weight: 900;
  color: var(--color-blue);
  text-transform: uppercase;
  font-size: 60px;
`;

const WrapperDropDown = styled.select`
  border: none;
  background: transparent;
  font-family: hobeaux, sans-serif;
  font-size: 60px;
  text-transform: uppercase;
  color: var(--color-blue);
  font-weight: 900;
  text-align: center;
`;
const DropDownItem = styled.option`
  border: none;
  background: transparent;
  font-family: hobeaux, sans-serif;
  font-size: 60px;
  text-transform: uppercase;
  color: var(--color-blue);
  font-weight: 900;
  &:hover {
    color: white;
    background: var(--color-blue);
  }
`;

export default DropDown;
