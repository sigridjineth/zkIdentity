import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { getInput } from "../../helpers/GetInput";
import {
  calculateProof,
  buildContractCallArgs,
} from "../../helpers/ProofHelper";
import { useSelector } from "react-redux";

const { ethereum } = window;

// actions
const GET_PROOF = "GET_PROOF";
const IS_LOADING = "IS_LOADING";

// action creators
const getProof = createAction(GET_PROOF, (getProof) => ({ getProof }));
const isLoading = createAction(IS_LOADING, (isLoading) => ({ isLoading }));

// initialState
const initialState = {
  getProof: undefined,
  isLoading: false,
};

// middleware actions

const _handleProve = (_provider) => {
  return async function (dispatch, getState, { history }) {
    dispatch(isLoading(true));

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
    dispatch(isLoading(false));
    alert("A proof has created!");
    history.push("/3");
  };
};

const _handleVerify = (account, proof, minter) => {
  return async function (dispatch, getState, { history }) {
    // take proof and call smart contract
    const proofs = JSON.parse(window.localStorage.getItem("proofs"));

    console.log(proof);

    // window.localStorage.setItem(
    //   "proofs",
    //   JSON.stringify(proofs.filter((item) => item.address === account))
    // );

    // NOTE: this assumes that proof is the proper output from `buildContractCallArgs
    const tx = await minter.mint(
      proof[0],
      proof[1],
      proof[2],
      proof[3],
      proof[4]
    );
    const receipt = await tx.wait();
    // TODO: txBeingSent and all that jazz. like in the unused transfer message

    if (receipt.status !== 0) {
      const storedProofs = window.localStorage.getItem("usedProofs");
      const usedProofs = storedProofs ? JSON.parse(storedProofs) : [];
      window.localStorage.setItem(
        "usedProofs",
        JSON.stringify([...usedProofs, proof])
      );
    }

    window.location.reload();
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
  },
  initialState
);

// action creator export
const actionCreators = { _handleProve, getProof, _handleVerify };

export { actionCreators };
