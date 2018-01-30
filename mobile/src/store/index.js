import { migrations } from "./migrations";
import {
	createMigrate,
	persistCombineReducers,
	persistStore
} from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import { reducer as userReducer } from "./users";
import { createStore } from "redux";

const debug = process.env.NODE_ENV === "development";

export function setupStore(callback) {
	const store = createStore(
		persistCombineReducers(
			{
				key: "masterpassx",
				storage: createSecureStore(),
				version: 0,
				migrate: createMigrate(migrations, { debug })
			},
			{
				users: userReducer
			}
		),
		undefined,
		debug
			? window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
			: undefined
	);
	// persistStore(store, null, callback);
	setTimeout(callback, 25);
	return store;
}
