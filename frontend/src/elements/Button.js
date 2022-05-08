import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Button = (props) => {
  const { onClick, children, small, margin, flexGrow } = props;

  const styles = {
    margin: margin,
    flexGrow: flexGrow,
  };

  if (small) {
    return (
      <ButtonSmall onClick={onClick} {...styles}>
        {children}
      </ButtonSmall>
    );
  }

  return (
    <ButtonLarge onClick={onClick} {...styles}>
      {children}
    </ButtonLarge>
  );
};

export default Button;

Button.defaultProps = {
  margin: 0,
  flexGrow: 0,
};

const ButtonLarge = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 12px;
  margin: ${(props) => props.margin};
  background-color: transparent;
  color: ${Colors.primary};
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 700;
  flex-grow: ${(props) => props.flexGrow};

  :hover {
    border: 1px solid ${Colors.primary};
    cursor: pointer;
  }
  :focus {
    border: 1px solid ${Colors.primary};
    box-shadow: 0px 0px 6px ${Colors.primary};
    cursor: pointer;
  }
`;

const ButtonSmall = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 4px;
  background-color: transparent;
  color: ${Colors.second};
  border: 1px solid transparent;
  border-radius: 2px;
  font-weight: 400;

  :hover {
    border: 1px solid ${Colors.second};
    cursor: pointer;
  }
  :focus {
    border: 1px solid ${Colors.second};
    box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
