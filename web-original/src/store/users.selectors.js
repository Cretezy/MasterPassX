import { createSelector } from "reselect";

export const getUsers = state => state.users.users;

export const getCurrentUserKey = state => state.users.currentUserKey;
export const getHasUsers = createSelector(getUsers, users => users.length > 0);

export const getCurrentUser = createSelector(
	[getUsers, getCurrentUserKey],
	(users, currentUserKey) => users.find(user => user.key === currentUserKey)
);
