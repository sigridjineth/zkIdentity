import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Input = (props) => {
  const { onChange, value, placeholder, id, label, alert, alertMessage, _ref } =
    props;

  const styles = { _ref };

  if (alert) {
    return (
      <>
        <InputLabel id={id}>{label}</InputLabel>
        <InputContainerAlert
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          ref={_ref}
        ></InputContainerAlert>
        <InputAlert>{alertMessage}</InputAlert>
      </>
    );
  }

  return (
    <>
      <InputLabel id={id}>{label}</InputLabel>
      <InputContainer
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={_ref}
      ></InputContainer>
    </>
  );
};

export default Input;

Input.defaultProps = {
  alert: false,
};

const InputContainer = styled.input`
  height: fit-content;
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: ${Colors.text};
  border: 1px solid transparent;
  border-radius: 2px;

  :focus {
    border: 1px solid ${Colors.primary};
    box-shadow: 0px 0px 6px ${Colors.primary};
  }

  :focus-visible {
    outline: none;
  }

  ::placeholder {
    color: ${Colors.text};
    opacity: 0.3;
  }
`;

const InputContainerAlert = styled.input`
  height: fit-content;
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: ${Colors.text};
  border: 1px solid ${Colors.alert};
  border-radius: 2px;

  :focus {
    box-shadow: 0px 0px 6px ${Colors.alert};
  }

  :focus-visible {
    outline: none;
  }

  ::placeholder {
    color: ${Colors.text};
    opacity: 0.3;
  }
`;

const InputLabel = styled.label`
  color: ${Colors.text};
`;

const InputAlert = styled.p`
  color: ${Colors.alert};
  padding-top: 4px;
`;
