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

  const handleChange = (e) => {
    setFlightNumber(e.target.value);
    setInfo({ ...info, flight: e.target.value });
  };

  return (
    <Wrapper>
      <WrapperDropDown name="flights" onChange={handleChange}>
        <DropDownItem selected disabled>
          Select a flight
        </DropDownItem>
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
  justify-content: center;
  color: var(--color-blue);
  border-bottom: 2px solid var(--color-blue);
  width: 100%;
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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const DropDownItem = styled.option`
  background: transparent;
  font-family: "Hobeaux", sans-serif;
  font-size: 60px;
  text-transform: uppercase;
  color: var(--color-blue);
  font-weight: 900;
  border: 2px solid var(--color-blue);
  &:hover {
    color: white;
    background: var(--color-blue);
  }
`;

export default DropDown;
