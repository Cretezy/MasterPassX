export const SET_DOMAIN = "SET_DOMAIN";

export function setDomain(domain) {
	return {
		type: SET_DOMAIN,
		domain
	};
}

const initialState = {
	domain: ""
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_DOMAIN:
			return {
				...state,
				domain: action.domain
			};
		default:
			return state;
	}
}
