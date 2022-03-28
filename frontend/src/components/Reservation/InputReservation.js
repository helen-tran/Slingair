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
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -140px;
  margin-left: -200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--color-alabama-crimson);
  width: 400px;
  height: 280px;
  border-radius: 10px;
`;
const InputField = styled.input`
  width: 270px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 20px;
`;
const ConfirmButton = styled.button`
  width: 300px;
  border: none;
  background: var(--color-alabama-crimson);
  border-radius: 5px;
  margin-top: 5px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
export default InputReservation;
