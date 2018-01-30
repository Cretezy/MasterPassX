import { createSelector } from "reselect";

export const getUsers = state => state.users.users;
export const getCurrentUserKey = state => state.users.currentUser;

export const hasUsers = createSelector(
	getUsers,
	users => Object.keys(users).length > 0
);
export const getCurrentUser = createSelector(
	[getUsers, getCurrentUserKey],
	([users, currentUserKey]) => users[currentUserKey]
);
export const getUsersList = createSelector(getUsers, users =>
	Object.values(users)
);
