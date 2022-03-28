import React, { useState } from "react";
import styled from "styled-components";
import InputReservation from "./InputReservation";
import ReservationInfo from "./ReservationInfo";
const Reservation = () => {
  const [seat, setSeat] = useState("");
  const [resInfo, setResInfo] = useState(null);
  const [dataInputted, setDataInputted] = useState(false);

  return (
    <PageWrapper>
      {!dataInputted ? (
        <InputReservation
          seat={seat}
          setSeat={setSeat}
          dataInputted={dataInputted}
          setDataInputted={setDataInputted}
        />
      ) : (
        <ReservationInfo
          seat={seat}
          resInfo={resInfo}
          setResInfo={setResInfo}
        />
      )}
    </PageWrapper>
  );
};
const PageWrapper = styled.div``;

export default Reservation;
