import React from "react";
import styled from "styled-components";
import { Button, Link, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
const { ethereum } = window;

const Header = (props) => {
  const { connected, address } = props;

  const selectedAddress = useSelector((state) => state.user.selectedAddress);

  const styles = {};

  return (
    <HeaderContainer {...styles}>
      {connected ? (
        <Flex>
          <Text margin="0 8px 0 0">{selectedAddress}</Text>
        </Flex>
      ) : (
        <></>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: fit-content;
  padding: 8px;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
