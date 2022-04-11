import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InputReservation = ({ seat, setSeat, dataInputted, setDataInputted }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    Object.values(seat).includes("") ? setDisabled(true) : setDisabled(false);
  }, [seat]);

  const handleClick = () => {
    setDataInputted(true);
  };

  return (
    <PageWrapper>
      <Wrapper>
        <InputField
          type="text"
          placeholder="Seat"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
          required
        />
        <ConfirmButton onClick={handleClick} disabled={disabled}>
          See Reservation
        </ConfirmButton>
      </Wrapper>
    </PageWrapper>
  );
};
const PageWrapper = styled.div`
  border: 2px solid var(--color-blue);
  border-radius: 30px;
  display: flex;
  width: 500px;
  justify-content: center;
  /* position: fixed;
  top: 45%;
  left: 50%;
  margin-top: -140px;
  margin-left: -200px; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 280px;
  border-radius: 10px;
`;
const InputField = styled.input`
  width: 270px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 20px;
  border: 2px solid var(--color-blue);
  border-radius: 30px;
`;
const ConfirmButton = styled.button`
  width: 300px;
  border: none;
  text-transform: uppercase;
  margin-top: 20px;
  background: var(--color-blue);
  border-radius: 30px;
  font-size: 20px;
  text-transform: uppercase;
  font-family: "Hobeaux";
  font-weight: 900;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
export default InputReservation;
