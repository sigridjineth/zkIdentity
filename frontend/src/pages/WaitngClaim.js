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
  React.useEffect(() => {
    setTimeout(function () {
      history.push("/6");
    }, 3000);
  }, []);

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
      <Link>Check the Transaction</Link>
    </Card>
  );
}

export default WaitngClaim;
