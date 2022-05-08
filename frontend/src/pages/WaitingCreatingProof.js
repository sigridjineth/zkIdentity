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

function WaitngCreatingProof() {
  function onClickRight() {}
  function onClickLeft() {
    history.goBack();
  }

  return (
    <Card>
      <Loading />
      <Spacing size="10px" />
      <Text bold>Waiting...</Text>
    </Card>
  );
}

export default WaitngCreatingProof;
