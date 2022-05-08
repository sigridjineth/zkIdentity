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
import Web3 from "web3";

function SecretClaim() {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

  const dispatch = useDispatch();
  const proofs = JSON.parse(window.localStorage.getItem("proofs"));
  const address = useSelector((state) => state.user.selectedAddress);
  const minter = useSelector((state) => state.user.minter);

  const privateNoteInputValue = React.useRef();
  const addressInputValue = React.useRef();

  const checkAddress = () => {
    try {
      web3.utils.toChecksumAddress(addressInputValue.current.value);
      return true;
    } catch (error) {
      console.log(error);
      console.error("invalid ethereum address", error.message);
      return false;
    }
  };

  const checkInput = () => {
    console.log(privateNoteInputValue.current.value);
    if (
      privateNoteInputValue.current.value === "" ||
      privateNoteInputValue.current.value === null ||
      privateNoteInputValue.current.value === undefined ||
      addressInputValue.current.value === "" ||
      addressInputValue.current.value === null ||
      addressInputValue.current.value === undefined
    ) {
      return false;
    } else {
      return true;
    }
  };
  function onClickRight() {
    console.log(checkInput());
    if (checkInput() === false) {
      console.log("Fill the blank");
      alert("Fill the blank!");
      return;
    }
    if (checkAddress() === false) {
      alert("Recheck the field");
      return;
    }
    console.log(proofs.length);
    dispatch(
      nftActions._handleVerify(
        addressInputValue.current.value,
        JSON.parse(privateNoteInputValue.current.value),
        minter
      )
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
      <Textarea
        placeholder="Enter a private note..."
        _ref={privateNoteInputValue}
      />
      <Spacing size="20px" />
      <Input
        placeholder="Type an ethereum recipient address..."
        _ref={addressInputValue}
      />
      <Spacing size="20px" />
      <ButtonWrap
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        btnLeft="Back"
        btnRight="Mint NFT"
      />
    </Card>
  );
}

export default SecretClaim;
