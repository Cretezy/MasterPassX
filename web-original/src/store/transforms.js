import { createTransform } from "redux-persist";

export const transforms = [
	createTransform(
		(state, key) => {
			// Don't save "no save" getUsers
			if (key === "users") {
				const users = state.users.filter(user => user.save);
				return { ...state, users };
			} else {
				return state;
			}
		},
		(state, key) => {
			try {
				// Fix current user key if it was "no save" getUsers
				if (key === "users") {
					const users = state.users;
					let currentUserKey;
					if (users.length === 0) {
						currentUserKey = null;
					} else if (
						!users.find(user => user.key === state.currentUserKey)
					) {
						currentUserKey = users[0].key;
					} else {
						currentUserKey = state.currentUserKey;
					}
					return { ...state, currentUserKey };
				} else {
					return state;
				}
			} catch (err) {
				return state;
			}
		},
		{ whitelist: ["users"] }
	)
];
