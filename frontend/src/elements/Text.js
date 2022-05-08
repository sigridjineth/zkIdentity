import React, { Children } from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Text = (props) => {
  const { bold, children, margin, flexGrow, opacity, alert } = props;

  const styles = {
    margin: margin,
    flexGrow: flexGrow,
    bold: bold,
    opacity: opacity,
    alert,
  };

  return <TextContainer {...styles}>{children}</TextContainer>;
};

Text.defaultProps = {
  margin: 0,
  flexGrow: 0,
  bold: null,
  opacity: 1,
};

export default Text;

const TextContainer = styled.p`
  ${(props) => (props.bold ? `font-weight: 700` : null)};
  margin: ${(props) => props.margin};
  opacity: ${(props) => props.opacity};
  color: ${(props) => (props.alert ? `${Colors.alert}` : `${Colors.text}`)};
`;
