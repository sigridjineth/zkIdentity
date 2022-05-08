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
import { useDispatch, useSelector } from "react-redux";
// import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../elements/Colors";
import "./link.css";

function Finish() {
  const txHash = useSelector((state) => state.nft.txHash);

  function onClickRight() {
    history.push("/");
  }
  function onClickLeft() {}

  React.useEffect(() => {
    console.log(txHash);
  }, []);

  return (
    <Card>
      <Text bold>
        <CheckIcon />
        Transaction has sent.
      </Text>
      <Spacing size="20px" />
      <Text>
        We’ve sucessfuly sent transaction to mint NFT. <br /> Check your
        transaction.
      </Text>
      <Spacing size="20px" />

      <Link
        className="link"
        onClick={() =>
          window.open(`https://goerli.etherscan.io/tx/${txHash}`, "_blank")
        }
      >
        Check Transaction
      </Link>

      <Spacing size="20px" />
      <ButtonWrap oneBtn onClickRight={onClickRight} btnRight="Go Home" />
    </Card>
  );
}

export default Finish;
