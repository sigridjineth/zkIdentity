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
import { CheckIcon, LinkIcon } from "../imgs/index";
import { history } from "../redux/configureStore";

function Finish() {
  function onClickRight() {
    history.push("/");
  }
  function onClickLeft() {}

  return (
    <Card>
      <Text bold>
        <CheckIcon />
        Done!
      </Text>
      <Spacing size="20px" />
      <Text>
        We’ve sucessfuly sent NFT. <br /> Check your transaction.
      </Text>
      <Spacing size="20px" />
      <LinkIcon />
      <Link>0x212113fdsfxxdsafdsfadsfadscxx</Link>
      <Spacing size="20px" />
      <ButtonWrap oneBtn onClickRight={onClickRight} btnRight="Go Home" />
    </Card>
  );
}

export default Finish;
