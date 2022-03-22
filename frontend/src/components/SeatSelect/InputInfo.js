import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// import seat selection into the prop
const InputInfo = ({ flight, info, setInfo, setSubStatus, subStatus }) => {
  const [disabled, setDisabled] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  // useEffect(() => {
  //   Object.values(info).includes("")
  //     ? setDisabled(true)
  //     : setDisabled(false);
  // ,[]}

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
      .then((json) => {
        const { status, error } = json;
        if (status === "success") {
          setSubStatus("confirmed");
        } else if (error) {
          setSubStatus("error");
          setErrMessage("error");
        }
      });
  };

  return (
    <Wrapper>
      <InputField
        type="text"
        placeholder="First Name"
        name="firstName"
        value={info.firstName}
        onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
      />
      <InputField
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={info.lastName}
        onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
      />
      <InputField
        type="text"
        placeholder="Email"
        name="email"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <ConfirmButton onClick={handleClick}>
        {subStatus === "pending" && (
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        )}
        {subStatus === "idle" && <span class="button-label">Submit</span>}
      </ConfirmButton>
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
