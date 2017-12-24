export const migrations = {
	0: (state) => {
		// migration clear out device state
		return {
			...state,
		}
	},
	1: (state) => {
		// migration to keep only device state
		const users = {};
		Object.keys(state.users.users).forEach(key => {
			const name = state.users.users[key];
			users[key] = {name, save: true};

		});
		return {
			...state,
			users: {
				...state.users,
				users
			}
		}
	}
};