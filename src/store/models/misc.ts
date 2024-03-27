import { Action, action, Thunk, thunk } from "easy-peasy";
import { store } from "../config";
import axios from "axios";
export interface MiscModel {
	progress: number;
	setProgress: Action<MiscModel, number>;
	getMetadata: Thunk<MiscModel>;
	getMetadataOnRefresh: Thunk<MiscModel>;
}

export const misc: MiscModel = {
	progress: 0,
	setProgress: action((state, payload) => {
		state.progress = payload;
	}),
	getMetadata: thunk(async (actions, payload, { fail, injections, getState }) => {
		store.getActions().student.getStudents();
	}),
	getMetadataOnRefresh: thunk(async (actions, payload, { fail, injections, getState }) => {
		let finalRsp;
		finalRsp = await axios.post("/api/users/verify", {});
		if (finalRsp.status === 200) {
			finalRsp = await store.getActions().student.getStudents();
			store.getActions().auth.setIsAuthenticated(true);
		}
		return finalRsp;
	}),
};
