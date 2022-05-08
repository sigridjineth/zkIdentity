import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../comps/index";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
} from "../elements/index";
import { history } from "../redux/configureStore";

function SecretClaim() {
  function onClickRight() {
    console.log("hi");
    history.push("/5");
  }
  function onClickLeft() {
    history.goBack();
  }

  return (
    <Card>
      <Text bold>Save your private note</Text>
      <Spacing size="20px" />
      <Text>
        Enter private note and recipient wallet. Reward will be trasfered to the
        recipient wallet.
      </Text>
      <Spacing size="20px" />
      <Textarea placeholder="Enter a private note..." />
      <Spacing size="20px" />
      <Input placeholder="Type an ethereum recipient address..." />
      <Spacing size="20px" />
      <ButtonWrap
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        btnLeft="Back"
        btnRight="Next"
      />
    </Card>
  );
}

export default SecretClaim;
