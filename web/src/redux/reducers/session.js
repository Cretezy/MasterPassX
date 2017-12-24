import * as Actions from "../actions/session";

const initialState = {
	domain:""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case Actions.SET_DOMAIN:
			return {
				...state,
				domain: action.domain
			};
		default:
			return state;
	}
}
