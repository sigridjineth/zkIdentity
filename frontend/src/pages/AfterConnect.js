import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../comps/index";
import { history } from "../redux/configureStore";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
} from "../elements/index";
import { WaitingCreatingProof } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as nftActions } from "../redux/modules/nft";

function AfterConnect(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.nft.isLoading);

  const _provider = useSelector((state) => state.user.provider);
  function onClickRight() {
    dispatch(nftActions._handleProve(_provider));
  }

  return (
    <>
      {!isLoading ? (
        <Card>
          <Text bold>Congrlatulate!</Text>
          <Spacing size="20px" />
          <Text>You are a winner of this stage!</Text>
          <Text>Claim your NFT.</Text>
          <Spacing size="20px" />
          <RadioButton name="claimType" id="1" label="Claim" disabled={true}>
            Receive reward with your original address
          </RadioButton>
          <Spacing size="20px" />
          <RadioButton name="claimType" id="2" label="Secret Claim">
            Receive reward with your second address <br /> to hide your score
            from other players
          </RadioButton>
          <Spacing size="20px" />
          <ButtonWrap
            oneButton
            onClickRight={onClickRight}
            btnRight="Mint NFT"
          />
        </Card>
      ) : (
        <WaitingCreatingProof />
      )}
    </>
  );
}

export default AfterConnect;
