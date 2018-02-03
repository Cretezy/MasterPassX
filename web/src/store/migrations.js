export const migrations = {
	0: state => state,
	1: state => {
		// Move "getUsers" from key => name to key => {name, save}
		const users = {};
		Object.keys(state.users.users).forEach(key => {
			const name = state.users.users[key];
			users[key] = { name, save: true };
		});
		return {
			...state,
			users: {
				...state.users,
				users
			}
		};
	},
	2: state => {
		// Move to array of users, change currentUser to currentUserKey
		const users = [];
		Object.keys(state.users.users).forEach(key => {
			users.push({ ...state.users.users[key], key });
		});
		const { currentUser, ...userState } = state.users;
		return {
			...state,
			users: {
				...userState,
				users,
				currentUserKey: currentUser
			}
		};
	}
};
