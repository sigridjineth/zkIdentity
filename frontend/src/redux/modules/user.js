import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { ethers } from "ethers";

import AttestationMinterArtifact from "../../contracts/AttestationMinter.json";
import contractAddress from "../../contracts/contract-address.json";

const { ethereum } = window;

// actions
const LOG_IN = "LOG_IN";
const GET_USER = "GET_USER";
const SELECT_USER = "SELECT_USER";
const NETWORK_ERROR = "NETWORK_ERROR";
const IS_LOADING = "IS_LOADING";
const PROVIDER = "PROVIDER";
const MINTER = "MINTER";

// action creators
const login = createAction(LOG_IN, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const selectedAddress = createAction(SELECT_USER, (selectedAddress) => ({
  selectedAddress,
}));
const networkError = createAction(NETWORK_ERROR, (networkError) => ({
  networkError,
}));
const isLoading = createAction(IS_LOADING, (isLoading) => ({ isLoading }));
const provider = createAction(PROVIDER, (provider) => ({ provider }));
const minter = createAction(MINTER, (minter) => ({ minter }));

//네트워크 설정
const HARDHAT_NETWORK_ID = "31337";
const GOERLI_NETWORK_ID = "5";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// initialState
const initialState = {
  tokenData: undefined,
  selectedAddress: undefined,
  balance: undefined,
  txBeingSent: undefined,
  transactionError: undefined,
  networkError: undefined,
  forceRefresh: 0,
  isLoading: false,
  provider: undefined,
  minter: undefined,
};

// middleware actions
const _checkNetwork = () => {
  if (
    ethereum.networkVersion === HARDHAT_NETWORK_ID ||
    ethereum.networkVersion === GOERLI_NETWORK_ID
  ) {
    console.log("true");
    return true;
  }
  console.log("false");
  return false;
};

const _intializeEthers = () => {
  const _provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log("EEEEEE")
  console.log("VVVVVVVV", contractAddress.AttestationMinter)
  const _minter = new ethers.Contract(
    contractAddress.AttestationMinter,
    AttestationMinterArtifact.abi,
    _provider.getSigner(0)
  );

  return {
    provider: _provider,
    minter: _minter,
  };
};

const loginDB = () => {
  return async function (dispatch, getState, { history }) {
    if (_checkNetwork() === false) {
      alert("Please connect Metamask to Localhost:8545 or goerli");
      return;
    }

    dispatch(isLoading(true));
    const data = await ethereum.send("eth_requestAccounts");
    dispatch(selectedAddress(data.result[0]));
    dispatch(isLoading(false));
    _intializeEthers();

    dispatch(provider(_intializeEthers().provider));
    dispatch(minter(_intializeEthers().minter));
  };
};

const loginCheckDB = () => {
  _intializeEthers();
  return async function (dispatch, getState, { history }) {
    const network = await ethereum.request({ method: "net_version" });

    const _provider = new ethers.providers.Web3Provider(window.ethereum);

    if (Number(network) === 5 || 31337) {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      dispatch(selectedAddress(accounts[0]));
    } else {
      dispatch(provider(undefined));
      dispatch(minter(undefined));
      return;
    }
    _intializeEthers();

    dispatch(provider(_intializeEthers().provider));
    dispatch(minter(_intializeEthers().minter));
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        localStorage.setItem("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SELECT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedAddress = action.payload.selectedAddress;
      }),
    [NETWORK_ERROR]: (state, action) => produce(state, (draft) => {}),
    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [PROVIDER]: (state, action) =>
      produce(state, (draft) => {
        draft.provider = action.payload.provider;
      }),
    [MINTER]: (state, action) =>
      produce(state, (draft) => {
        draft.minter = action.payload.minter;
      }),
  },
  initialState
);

// action creator export
const actionCreators = { loginDB, loginCheckDB };

export { actionCreators };
