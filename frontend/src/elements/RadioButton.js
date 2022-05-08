import React from "react";
import styled from "styled-components";
import { Text } from "./index";
import { Colors } from "./Colors";

const RadioButton = (props) => {
  const { id, label, caption, name, children, margin, checked, disabled } =
    props;

  const styles = { margin, checked };

  return (
    <RadioButtonWrap {...styles}>
      <RadioButtonContainer
        {...styles}
        id={id}
        name={name}
        disabled={disabled}
        type="radio"
      />
      <RidioButtonLabel
        {...styles}
        checked={checked}
        margin="0 0 0 8px"
        htmlFor={id}
        name={name}
      >
        {label}
      </RidioButtonLabel>
      <RidioButtonCaption
        {...styles}
        checked={checked}
        margin="4px 20px"
        htmlFor={id}
        name={name}
      >
        {children}
      </RidioButtonCaption>
    </RadioButtonWrap>
  );
};

export default RadioButton;

const RadioButtonWrap = styled.div`
  width: 100%;
  height: fit-content;
  margin: ${(props) => props.margin};
  :hover {
    cursor: pointer;
  }
`;

const RidioButtonLabel = styled.label`
  margin: ${(props) => props.margin};
  :hover {
    cursor: pointer;
  }
`;

const RidioButtonCaption = styled.label`
  display: inline-block;
  margin: ${(props) => props.margin};
  opacity: 0.5;
  :hover {
    cursor: pointer;
  }
`;

const RadioButtonContainer = styled.input`
  :hover {
    cursor: pointer;
  }
  :checked {
  }
  &:checked + ${RidioButtonLabel} {
    color: ${Colors.approve};
  }
`;
