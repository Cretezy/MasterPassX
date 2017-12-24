import {createTransform} from "redux-persist";

export const transforms = [
	createTransform(
		(state, key) => {
			// Don't save "no save" users
			if (key === "users") {
				const users = {};
				Object.keys(state.users).forEach(key => {
					const user = state.users[key];
					if (user.save) {
						users[key] = user;
					}
				});
				return {...state, users};
			} else {
				return state;
			}
		},
		(state, key) => {
			// Fix current user key if it was "no save" users
			if (key === "users") {
				const users = Object.keys(state.users);
				let currentUser;
				if (users.length === 0) {
					currentUser = null;
				} else if (!users.includes(state.currentUser)) {
					currentUser = users[0];
				} else {
					currentUser = state.currentUser;
				}
				return {...state, currentUser};
			} else {
				return state;
			}
		},
		{whitelist: ["users"]}
	)
];