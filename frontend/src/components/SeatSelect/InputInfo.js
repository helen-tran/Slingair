import React from "react";
import styled from "styled-components";

const InputInfo = () => {
  return (
    <Wrapper>
      <InputField type="text" placeholder="First Name" />
      <InputField type="text" placeholder="Last Name" />
      <InputField type="text" placeholder="Email" />
      <ConfirmButton>Confirm</ConfirmButton>
    </Wrapper>
  );
};
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
`;
export default InputInfo;
