import {migrations} from "./migrations";
import {transforms} from "./transforms";
import {createMigrate, persistCombineReducers, persistStore} from "redux-persist";
import storage from "localforage";

import userReducer from "./reducers/users";
import sessionReducer from "./reducers/session";
import createStore from "redux/lib/createStore";

export function setupStore() {
	const store = createStore(
		persistCombineReducers(
			{
				key: "masterpassx",
				storage,
				version: 1,
				transforms,
				blacklist: ["session"],
				migrate: createMigrate(migrations, {debug: false})
			},
			{
				users: userReducer,
				session: sessionReducer
			}
		),
		undefined,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	const persistor = persistStore(store);
	return {store, persistor};
}