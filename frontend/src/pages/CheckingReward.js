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
  Loading,
} from "../elements/index";
import { history } from "../redux/configureStore";

function CheckingReward(props) {
  function onClickRight() {}
  function onClickLeft() {}

  // React.useEffect(() => {
  //   setTimeout(function () {
  //     history.push("/2");
  //   }, 3000);
  // }, []);

  const { isLoading } = props;

  return (
    <>
      {isLoading ? (
        <>
          <Card>
            <Loading />
            <Spacing size="10px" />
            <Text bold>Waiting...</Text>
            <Spacing size="20px" />
            <Text>We're checking your score.</Text>
          </Card>
        </>
      ) : null}
    </>
  );
}

export default CheckingReward;
