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
import { useDispatch, useSelector } from "react-redux";

function PrivateNote() {
  const dispatch = useDispatch();

  function onClickRight() {
    console.log("hi");
    history.push("/4");
  }

  function onClickLeft() {
    history.goBack();
  }

  return (
    <Card>
      <Text bold>Save your private note</Text>
      <Spacing size="20px" />
      <Text>
        Please back up your note. You will need it later to withdraw your
        deposit.
      </Text>
      <Spacing size="20px" />
      <Text alert>
        Treat your note as a private key - never share it with anyone, including
        darkforest developers.
      </Text>
      <Spacing size="20px" />
      <Textarea value="darkforest-eth-0.1-1-0xac2d46376572af088e84d2a567b844a949b33f26a7c01736415d15c96c9726c70467c895461e0373501256470786d5642eb7bc27d1876e4840fcb72ffa1c " />
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

export default PrivateNote;
