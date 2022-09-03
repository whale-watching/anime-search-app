import React from "react";
import styled from "styled-components";

const FootBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  border-top: solid 1px #dddddd;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Discription = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const Footer = () => {
  return (
    <FootBar>
      <Name>Chris Chen</Name>
      <Discription></Discription>
    </FootBar>
  );
};

export default Footer;
