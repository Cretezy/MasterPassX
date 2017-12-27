export const migrations = {
	0: state => state,
	1: state => {
		// Move "users" from key => name to key => {name, save}
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
	}
};
