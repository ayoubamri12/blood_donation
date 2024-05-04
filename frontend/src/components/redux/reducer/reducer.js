import types from "../actions/types";

const initState ={
    campaign:{}
};

export default   (state = initState, { type, payload }) => {
  switch (type) {

  case types.FETCH_CAMPAIGN:
    return { ...state, campaign:{... payload} }

  default:
    return state
  }
}
