import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../../../zkIdentity/zk-identity/frontend/src/comps/index";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
  Link,
  Loading,
} from "../../../zkIdentity/zk-identity/frontend/src/elements/index";
import { history } from "../../../zkIdentity/zk-identity/frontend/src/redux/configureStore";

function WaitngCreatingProof() {
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

export default WaitngCreatingProof;
