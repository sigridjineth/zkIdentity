import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { getInput } from "../../helpers/GetInput"
import {
  calculateProof,
  buildContractCallArgs,
} from "../../helpers/ProofHelper";
import { useSelector } from "react-redux";

const { ethereum } = window;

// actions
const GET_PROOF = "GET_PROOF";

// action creators
const getProof = createAction(GET_PROOF, (getProof) => ({ getProof }));
// initialState
const initialState = {
  getProof: undefined,
};

// middleware actions

const _handleProve = (_provider) => {
  return async function (dispatch, getState, { history }) {
    console.log("Calculate Proof");

    const input = await getInput(_provider.getSigner(0));
    console.log(input);

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
    dispatch(getProof(JSON.stringify([...currentProofs, contractArgs])));
    window.location.reload();
  };
};

const _handleVerify = () => {
  return async function (dispatch, getState, { history }) {};
};

// reducer
export default handleActions(
  {
    [GET_PROOF]: (state, action) =>
      produce(state, (draft) => {
        draft.getProof = action.payload.getProof;
      }),
  },
  initialState
);

// action creator export
const actionCreators = { _handleProve };

export { actionCreators };
