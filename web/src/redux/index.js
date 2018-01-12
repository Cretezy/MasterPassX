import { migrations } from "./migrations";
import { transforms } from "./transforms";
import {
	createMigrate,
	persistCombineReducers,
	persistStore
} from "redux-persist";
import storage from "localforage";

import { reducer as userReducer } from "./users";
import { reducer as sessionReducer } from "./session";
import createStore from "redux/lib/createStore";

const debug = process.env.NODE_ENV === "development";

export function setupStore() {
	const store = createStore(
		persistCombineReducers(
			{
				key: "masterpassx",
				storage,
				version: 1,
				transforms,
				blacklist: ["session"],
				migrate: createMigrate(migrations, { debug })
			},
			{
				users: userReducer,
				session: sessionReducer
			}
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
