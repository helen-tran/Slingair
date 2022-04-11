import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import InputInfo from "./InputInfo";

const Plane = ({
  flightNumber,
  setSubStatus,
  subStatus,
  setInfo,
  info,
  setFlightNumber,
  flights,
}) => {
  const [seating, setSeating] = useState([]);
  const [checked, setChecked] = useState("");
  // use effect and pass through flight - get single flight
  useEffect(() => {
    fetch(`/api/${flightNumber}`, {
      headers: {
        Accept: "application.json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data.seats);
        setSeating(data.data.seats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flightNumber]);

  return (
    <SelectionWrapper>
      <InputInfo
        flightNumber={flightNumber}
        setSubStatus={setSubStatus}
        subStatus={subStatus}
        setInfo={setInfo}
        info={info}
      />
      <PlaneWrapper>
        <DropDown
          flights={flights}
          flightNumber={flightNumber}
          setFlightNumber={setFlightNumber}
          setInfo={setInfo}
          info={info}
        />
        <WrapperSpacing>
          <Wrapper>
            {seating &&
              seating.length > 0 &&
              seating.map((seat) => (
                <SeatWrapper key={`seat-${seat.id}`}>
                  <label>
                    {seat.isAvailable ? (
                      <>
                        <Seat
                          type="radio"
                          name="seat"
                          id="seat"
                          onChange={() => {
                            setInfo({ ...info, seat: seat.id });
                            setChecked(seat.id);
                          }}
                        />
                        <Available
                          style={{
                            background:
                              checked === seat.id &&
                              "var(--color-alabama-crimson)",
                            color: checked === seat.id && "#fff",
                          }}
                        >
                          {seat.id}
                        </Available>
                      </>
                    ) : (
                      <Unavailable>{seat.id}</Unavailable>
                    )}
                  </label>
                </SeatWrapper>
              ))}
          </Wrapper>
        </WrapperSpacing>
      </PlaneWrapper>
    </SelectionWrapper>
  );
};

const PlaneWrapper = styled.div`
  border: 2px solid var(--color-blue);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
`;
const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const WrapperSpacing = styled.div`
  border-top: 2px solid var(--color-blue);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 50px 50px;
  padding: 55px 5px;
  position: relative;
`;
const SeatWrapper = styled.li`
  display: flex;
  font-size: 30px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;
const Seat = styled.input`
  opacity: 1;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked {
    span {
      color: #fff;
      background: var(--color-blue);
      font-weight: 700;
    }
  }
`;
const SeatNumber = styled.span`
  border-radius: 10px;
  color: var(--color-blue);
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: 45px;
  transition: all ease 300ms;
`;
const Available = styled(SeatNumber)`
  background: #f6f0e6;
  border: 2px solid var(--color-blue);
  cursor: pointer;

  &.checked,
  &:hover {
    background: var(--color-blue);
    color: #fff;
    font-weight: 700;
  }
`;
const Unavailable = styled(SeatNumber)`
  background: var(--color-selective-yellow);
  cursor: not-allowed;
  opacity: 0.4;
`;

export default Plane;
