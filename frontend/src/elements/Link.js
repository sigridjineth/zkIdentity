import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Link = (props) => {
  const { children, onClick } = props;

  const styles = {};

  return (
    <LinkContainer {...styles} onClick={onClick}>
      {children}
    </LinkContainer>
  );
};

export default Link;

const LinkContainer = styled.button`
  color: ${Colors.second};
  text-decoration-line: underline;
  background: none;
  border: none;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`;
