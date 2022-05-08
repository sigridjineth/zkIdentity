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
} from "../elements";
import { CheckIcon, LinkIcon, FailedIcon } from "../imgs/index";
import { history } from "../redux/configureStore";

function FinishFail() {
  function onClickRight() {
    history.push("/");
  }
  function onClickLeft() {}

  return (
    <Card>
      <Text bold>
        <FailedIcon />
        Transaction is failed.
      </Text>
      <Spacing size="20px" />
      <Text>Please Retry.</Text>
      <Spacing size="20px" />
      <ButtonWrap oneBtn onClickRight={onClickRight} btnRight="Go Home" />
    </Card>
  );
}

export default FinishFail;
