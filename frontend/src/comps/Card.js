import React, { Children } from "react";
import styled from "styled-components";
import { Colors } from "../elements/Colors";
import { ButtonWrap } from "./index";
import { Button, Text, Spacing } from "../elements";

const Card = (props) => {
  const {
    title,
    contents,
    btnRight,
    btnLeft,
    oneButton,
    onClickLeft,
    onClickRight,
    children,
  } = props;

  const styles = {};

  return <CardContainer {...styles}>{children}</CardContainer>;
};

export default Card;

const CardContainer = styled.div`
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 180px);
  height: fit-content;
  width: 360px;
  padding: 36px;
  background-color: ${Colors.surface};
  border: 0.8px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
`;
