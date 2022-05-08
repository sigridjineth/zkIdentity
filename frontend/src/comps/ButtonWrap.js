import React from "react";
import styled from "styled-components";
import { Colors } from "../elements/Colors";
import { Button, Text, Spacing } from "../elements";

const ButtonWrap = (props) => {
  const {
    btnRight,
    btnLeft,
    oneButton,
    onClickRight,
    onClickLeft,
  } = props;

  const styles = {
  };

  if (oneButton) {
    return (
      <ButtonContainer>
        <FlexContiner></FlexContiner>
        <ButtonContainerRight>
          <Button onClick={onClickRight} margin="0 -12px -12px">{btnRight}</Button>
        </ButtonContainerRight>
      </ButtonContainer>
    )
  }

  return (
      <ButtonContainer>
        <ButtonContainerLeft>
          <Button onClick={onClickLeft} margin="0 0 -12px -12px">{btnLeft}</Button>
        </ButtonContainerLeft>
        <ButtonContainerRight>
          <Button onClick={onClickRight} margin="0 -12px -12px">{btnRight}</Button>
        </ButtonContainerRight>
      </ButtonContainer>
  );
}

export default ButtonWrap;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const ButtonContainerLeft = styled.div`
  display: flex;
  order: 0;
  flex-grow: 1;
`

const ButtonContainerRight = styled.div`
  display: flex;
  order: 1;
  flex-grow: 0;
`

const FlexContiner = styled.div`
  display: flex;
  order: 0;
  flex-grow: 1;
  width: 10px;
`