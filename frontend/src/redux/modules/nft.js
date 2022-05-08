import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { getInput } from "../../helpers/GetInput";
import calculateProof from "../../helpers/ProofHelper";
import buildContractCallArgs from "../../helpers/ProofHelper2";
import { useSelector } from "react-redux";

const { ethereum } = window;

// actions
const GET_PROOF = "GET_PROOF";
const IS_LOADING = "IS_LOADING";
const TX_HASH = "TX_HASH";

// action creators
const getProof = createAction(GET_PROOF, (getProof) => ({ getProof }));
const isLoading = createAction(IS_LOADING, (isLoading) => ({ isLoading }));
const txHash = createAction(TX_HASH, (txHash) => ({ txHash }));

// initialState
const initialState = {
  getProof: undefined,
  isLoading: false,
  txHash: undefined,
};

// middleware actions

const _handleProve = (_provider) => {
  return async function (dispatch, getState, { history }) {
    dispatch(isLoading(true));

    const input = await getInput(_provider.getSigner(0));

    const proof = await calculateProof(input);
    console.log(proof);

    const merkleRoot = 1234;
    const nullifier = 10;
    const contractArgs = buildContractCallArgs(proof, merkleRoot, nullifier);
    console.log(contractArgs);

    // save proof to localStorage
    const storedProofs = window.localStorage.getItem("proofs");
    const currentProofs = storedProofs ? JSON.parse(storedProofs) : [];
    window.localStorage.setItem(
      "proofs",
      JSON.stringify([...currentProofs, contractArgs])
    );
    dispatch(isLoading(false));
    alert("A proof has created!");
    history.push("/3");
  };
};

const _handleVerify = (account, proof, minter) => {
  return async function (dispatch, getState, { history }) {
    dispatch(isLoading(true));
    await minter
      .mint(proof[0], proof[1], proof[2], proof[3], proof[4])
      .then((response) => {
        console.log(response.hash);
        dispatch(txHash(response.hash));
        dispatch(isLoading(false));
        history.push("/6");
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(isLoading(false));
        history.push("/fail");
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_PROOF]: (state, action) =>
      produce(state, (draft) => {
        draft.getProof = action.payload.getProof;
      }),
    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [TX_HASH]: (state, action) =>
      produce(state, (draft) => {
        draft.txHash = action.payload.txHash;
      }),
  },
  initialState
);

// action creator export
const actionCreators = { _handleProve, getProof, _handleVerify };

export { actionCreators };
