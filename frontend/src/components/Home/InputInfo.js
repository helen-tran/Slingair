import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// import seat selection into the prop
const InputInfo = ({ info, setInfo, setSubStatus, subStatus }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    Object.values(info).includes("") ? setDisabled(true) : setDisabled(false);
  }, [info]);

  const handleClick = (ev) => {
    ev.preventDefault();
    setSubStatus("pending");
    fetch("/reservations", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataServer) => {
        return setInfo({ ...info, id: dataServer.data.id });
      });
  };

  return (
    <Wrapper>
      <Title>ENTER INFORMATION</Title>
      <InputWrapper>
        <InputField
          type="text"
          placeholder="First Name"
          name="firstName"
          value={info.firstName}
          onChange={(e) => setInfo({ ...info, givenName: e.target.value })}
          required
        />
        <InputField
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={info.lastName}
          onChange={(e) => setInfo({ ...info, surname: e.target.value })}
          required
        />
        <InputField
          type="text"
          placeholder="Email"
          name="email"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          required
        />
        <ConfirmButton onClick={handleClick} disabled={disabled}>
          {subStatus === "pending" && (
            <Loading>
              <div></div>
              <div></div>
            </Loading>
          )}
          {subStatus === "idle" && <span class="button-label">Submit</span>}
        </ConfirmButton>
      </InputWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-blue);
  width: 50%;
  margin-right: 40px;
  border-radius: 30px;
`;
const Title = styled.h2`
  color: var(--color-blue);
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 50px;
  text-align: center;
`;
const InputWrapper = styled.div`
  display: flex;
  border-top: 2px solid var(--color-blue);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 50px;
`;
const InputField = styled.input`
  width: 470px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  border-radius: 40px;
  border: 2px solid var(--color-blue);
`;
const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 150px;
  border: none;
  background: var(--color-blue);
  border-radius: 20px;
  margin-top: 10px;
  padding: 10px 20px 10px 20px;
  font-weight: 700;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ldsRipple = keyframes`
0% {
  top: 36px;
  left: 36px;
  width: 0;
  height: 0;
  opacity: 1;
}
100% {
  top: 0px;
  left: 0px;
  width: 72px;
  height: 72px;
  opacity: 0;
}
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  top: -21px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;
export default InputInfo;
