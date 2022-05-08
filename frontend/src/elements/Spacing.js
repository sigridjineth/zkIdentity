import React from "react";
import styled from "styled-components";

const Spacing = (props) => {
  const { size } = props;

  const styles = {
    size: size,
  };

  return <SpacingContainer {...styles} />;
};

Spacing.defaultProps = {
  height: "inherit",
  width: "inherit",
};

export default Spacing;

const SpacingContainer = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;
