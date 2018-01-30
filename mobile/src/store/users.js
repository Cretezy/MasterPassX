import { ADD_USER, REMOVE_USER, SET_CURRENT_USER } from "./users.actions";

const initialState = {
	users: {},
	currentUser: null
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				users: {
					...state.users,
					[action.key]: { name: action.name, key: action.key }
				},
				currentUser: action.key
			};
		case REMOVE_USER:
			const users = {};
			Object.keys(state.users).forEach(key => {
				if (key !== action.key) {
					users[key] = state.users[key];
				}
			});

			let currentUser;
			if (Object.keys(users).length === 0) {
				currentUser = null;
			} else if (state.currentUser === action.key) {
				currentUser = Object.keys(users)[0];
			} else {
				currentUser = state.currentUser;
			}
			return { ...state, users, currentUser };
		case SET_CURRENT_USER:
			return { ...state, currentUser: action.key };
		default:
			return state;
	}
}
