import types from "./types";

export function fetch_campgain(data){
    return {
        type:types.FETCH_CAMPAIGN,
        payload:data
    }
}