export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function addUser(name, key) {
	return {
		type: ADD_USER,
		name,
		key
	}
}

export function removeUser(key) {
	return {
		type: REMOVE_USER,
		key
	}
}

export function setCurrentUser(key) {
	return {
		type: SET_CURRENT_USER,
		key
	}
}