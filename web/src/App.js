import React from 'react';
import {createStore} from 'redux'
import {persistStore, persistCombineReducers, createTransform, createMigrate} from 'redux-persist'
import {PersistGate} from 'redux-persist/lib/integration/react'
import storage from 'localforage'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import reducer from "./reducer";

import "./App.css"

import Generate from "./pages/Generate";
import {connect, Provider} from "react-redux";
import AddUser from "./pages/AddUser";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";
import {migrations} from "./migrations";

export default class App extends React.Component {
	constructor() {
		super();
		this.store = createStore(persistCombineReducers(
			{
				key: 'mpx',
				storage,
				version: 1,
				transforms: [createTransform(
					(state, key) => {
						// Don't save "no save" users
						if (key === "users") {
							const users = {};
							Object.keys(state.users).forEach(key => {
								const user = state.users[key];
								if (user.save) {
									users[key] = user;
								}
							});
							return ({...state, users});
						} else {
							return state;
						}
					},
					null,
					{whitelist: ['users']}
				)],
				migrate: createMigrate(migrations, {debug: false}),
			},
			{users: reducer}
		), undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
		this.persistor = persistStore(this.store);
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

const Router = connect(state => ({users: state.users.users}))(class extends React.Component {
	render() {
		return (
			<BrowserRouter>
				{/*<div className="w-100 d-flex align-items-center pt-3 pb-2 px-2">*/}
				{/*<div className="container">*/}
				<Switch>
					{Object.keys(this.props.users).length ?
						[
							<Route key="route-home" exact path="/" component={Generate}/>,
							<Route key="route-settings" exact path="/settings" component={Settings}/>
						]
						:
						[
							<Route key="route-welcome" exact path="/" component={Welcome}/>
						]
					}
					<Route exact path="/add" component={AddUser}/>
					<Route path="*" component={() => <Redirect to={{pathname: '/'}}/>}/>
				</Switch>
				{/*</div>*/}
				{/*</div>*/}
			</BrowserRouter>
		)
	}
})