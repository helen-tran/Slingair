import React from "react";
import styled from "styled-components";
const DropDown = ({ flights, flight, setFlight, info, setInfo }) => {
  if (!flights) {
    return <div></div>;
  }
  // console.log(flights);
  let flightName = [];
  for (const property in flights) {
    flightName.push(property);
  }
  // console.log(flightName, "flightName");
  const handleChange = (e) => {
    setFlight(e.target.value);
    setInfo({ ...info, flightNumber: e.target.value });
  };

  // The flight Number SA231
  // console.log(flight);
  return (
    <Wrapper>
      <Title>Flight Number</Title>
      <WrapperDropDown name="flights" onChange={handleChange}>
        <DropDownItem>Select a flight</DropDownItem>
        {flightName.map((flight) => {
          return <DropDownItem>{flight}</DropDownItem>;
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
