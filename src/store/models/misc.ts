import { Action, action, Thunk, thunk } from "easy-peasy";
import { store } from "../config";
export interface MiscModel {
    progress:number;
    setProgress:Action<MiscModel,number>;
}

export const misc: MiscModel = {
 progress:0,
 setProgress: action((state, payload) => {
    state.progress = payload;
  }),
};
