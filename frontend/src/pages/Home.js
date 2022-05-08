import React, { useState, useEffect, Children } from "react";
import { ethers } from "ethers";
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
import { CheckingReward, AfterConnect } from "./index";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const RightClick = () => {
    dispatch(userActions.loginDB());
  };
  return (
    <>
      {isLoading ? (
        <>
          <CheckingReward isLoading={isLoading} />
        </>
      ) : (
        <Card>
          <Text bold>Claim Reward</Text>
          <Spacing size="20px" />
          <Text>If you want to claim your NFT,</Text>
          <Text>Please connect your wallet.</Text>
          <Spacing size="20px" />
          <ButtonWrap
            oneButton
            onClickRight={RightClick}
            btnRight="Connect Wallet"
          />
        </Card>
      )}
    </>
  );
}

export default Home;
