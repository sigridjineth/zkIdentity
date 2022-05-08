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
import { actionCreators as nftActions } from "../redux/modules/nft";

function PrivateNote() {
  const dispatch = useDispatch();
  const is_loading = useSelector((state) => state.user.selectedAddress);

  const proofs = JSON.parse(window.localStorage.getItem("proofs"));
  const proof = JSON.stringify(proofs[proofs.length - 1]);
  React.useEffect(() => {
    console.log(JSON.stringify(proofs[proofs.length - 1]));
  }, []);

  function onClickRight() {
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
      <Textarea value={proof} />
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
