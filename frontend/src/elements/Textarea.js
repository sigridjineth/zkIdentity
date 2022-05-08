import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";

const Textarea = (props) => {
  const {
    onChange,
    value,
    placeholder,
    id,
    label,
    alert,
    alertMessage,
    height,
    _ref,
  } = props;

  const styles = {
    height: height,
    _ref,
  };

  if (alert) {
    return (
      <>
        <TextareaLabel id={id}>{label}</TextareaLabel>
        <TextareaContainerAlert
          {...styles}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          ref={_ref}
        ></TextareaContainerAlert>
        <TextareaAlert>{alertMessage}</TextareaAlert>
      </>
    );
  }

  return (
    <>
      <TextareaLabel id={id}>{label}</TextareaLabel>
      <TextareaContainer
        {...styles}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={_ref}
      ></TextareaContainer>
    </>
  );
};

export default Textarea;

Textarea.defaultProps = {
  alert: false,
  height: "100px",
};

const TextareaContainer = styled.textarea`
  height: ${(props) => props.height};
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: ${Colors.text};
  border: 1px solid transparent;
  border-radius: 2px;
  resize: none;

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

const TextareaContainerAlert = styled.textarea`
  height: ${(props) => props.height};
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

const TextareaLabel = styled.label`
  color: ${Colors.text};
`;

const TextareaAlert = styled.p`
  color: ${Colors.alert};
  padding-top: 4px;
`;
