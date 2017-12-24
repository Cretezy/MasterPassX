import React from "react";
import {PersistGate} from "redux-persist/lib/integration/react";

import "./App.css";

import { Provider} from "react-redux";
import {setupStore} from "./redux";
import {Router} from "./pages";

export default class App extends React.Component {
	constructor() {
		super();
		const {store, persistor} = setupStore();
		this.store = store;
		this.persistor = persistor;
	}

	render() {
		return (
			<PersistGate persistor={this.persistor}>
				<Provider store={this.store}>
					<Router/>
				</Provider>
			</PersistGate>
		);
	}
}
