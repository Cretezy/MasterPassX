import * as Actions from "./actions";

const initialState = {
	users: {},
	currentUser: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.ADD_USER:
			return {
				...state,
				users: {...state.users, [action.key]: action.name},
				currentUser: action.key
			};
		case Actions.REMOVE_USER:
			const users = {};
			Object.keys(state.users).forEach(key => {
				if (key !== action.key) {
					users[key] = state.users[key]
				}
			});

			let currentUser;
			if (Object.keys(users).length === 0) {
				currentUser = null
			} else if (state.currentUser === action.key) {
				currentUser = Object.keys(users)[0];
			} else {
				currentUser = state.currentUser;
			}
			return {...state, users, currentUser};
		case Actions.SET_CURRENT_USER:
			return {...state, currentUser: action.key};
		default:
			return state
	}
}
