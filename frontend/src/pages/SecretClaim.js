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

function SecretClaim() {
  const dispatch = useDispatch();
  const proofs = JSON.parse(window.localStorage.getItem("proofs"));
  const address = useSelector((state) => state.user.selectedAddress);
  const minter = useSelector((state) => state.user.minter);

  function onClickRight() {
    console.log(proofs.length);
    dispatch(
      nftActions._handleVerify(address, proofs[proofs.length - 1], minter)
    );
    history.push("/5");
  }
  function onClickLeft() {
    history.goBack();
  }

  return (
    <Card>
      <Text bold>Secret Claim</Text>
      <Spacing size="20px" />
      <Text>Enter private note and recipient wallet.</Text>
      <Text>Reward will be trasfered to the recipient wallet.</Text>
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
