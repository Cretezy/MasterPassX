import { ADD_USER, REMOVE_USER, SET_CURRENT_USER } from "./users.actions";

const initialState = {
	users: [],
	currentUserKey: null
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER:
			// Don't allow dupes
			if (state.users.find(user => user.key === action.key)) {
				return state;
			}
			return {
				...state,
				users: [
					...state.users,
					{ name: action.name, save: action.save, key: action.key }
				],
				currentUserKey: action.key
			};
		case REMOVE_USER:
			const users = state.users.filter(user => user.key !== action.key);
			let currentUserKey;
			if (users.length === 0) {
				currentUserKey = null; // No more users
			} else if (!users.find(user => user.key === state.currentUserKey)) {
				currentUserKey = users[0].key; // Deleted current user
			} else {
				currentUserKey = state.currentUserKey; // No change
			}
			return { ...state, users, currentUserKey };
		case SET_CURRENT_USER:
			return { ...state, currentUserKey: action.key };
		default:
			return state;
	}
}
