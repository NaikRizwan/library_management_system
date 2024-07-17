import React from "react";
import FourCards from "./FourCards";
import BarChart from "./chart/Bar";
import TrafficChart from "./chart/Traffic";
import styled from "styled-components";
const Wrapper = styled.section`
  .chartcontainer {
    background-color: white;
    padding: 11px 20px 7px 7px;
    border-radius: 9px;
  }
`;
const Layout = () => {
  return (
    <Wrapper>
      <div>
        <FourCards />
        <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
          <div className="chartcontainer">
            <BarChart />
          </div>
          <div className="chartcontainer">
            <TrafficChart />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Layout;
