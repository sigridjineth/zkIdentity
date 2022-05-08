import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../comps/index";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
  Link,
  Loading,
} from "../elements/index";
import { history } from "../redux/configureStore";

function WaitngClaim() {
  function onClickRight() {}
  function onClickLeft() {
    history.goBack();
  }

  return (
    <Card>
      <Loading />
      <Spacing size="10px" />
      <Text bold>Waiting...</Text>
      <Spacing size="20px" />
      <Text>We're minting your NFT.</Text>
    </Card>
  );
}

export default WaitngClaim;
