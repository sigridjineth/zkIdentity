import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Link = (props) => {
  const { children } = props;

  const styles = {};

  return <LinkContainer {...styles}>{children}</LinkContainer>;
};

export default Link;

const LinkContainer = styled.span`
  color: ${Colors.second};
  text-decoration-line: underline;

  :hover {
    cursor: pointer;
  }
`;
