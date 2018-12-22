import { migrations } from "./migrations";
import { transforms } from "./transforms";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "localforage";

import { reducer as userReducer } from "./users";
import { reducer as sessionReducer } from "./session";
import { combineReducers, createStore } from "redux";

const debug = process.env.NODE_ENV === "development";

export function setupStore() {
	const store = createStore(
		persistReducer(
			{
				key: "masterpassx",
				storage,
				version: 2,
				transforms,
				blacklist: ["session"],
				migrate: createMigrate(migrations, { debug }),
				debug
			},
			combineReducers({
				users: userReducer,
				session: sessionReducer
			})
		),
		undefined,
		debug
			? window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
			: undefined
	);
	const persistor = persistStore(store);
	return { store, persistor };
}
