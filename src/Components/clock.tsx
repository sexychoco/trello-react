import Moment from "react-moment";
import { useInterval } from "use-interval";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

function getClock() {
  const [nowTime, setNowTime] = useState(Date.now());

  useInterval(() => {
    setNowTime(Date.now());
  }, 1000);
  return (
    <Wrapper>
      <Moment format={"HH:mm:ss"} className={"moment-box"}>
        {nowTime}
      </Moment>
    </Wrapper>
  );
}

export default getClock;
