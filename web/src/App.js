import React from 'react';
import {createStore} from 'redux'
import {persistStore, persistCombineReducers} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import reducer from "./reducer";

import "./App.css"

import Generate from "./pages/Generate";
import {connect, Provider} from "react-redux";
import AddUser from "./pages/AddUser";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";

export default class App extends React.Component {
	constructor() {
		super();
		this.store = createStore(persistCombineReducers(
			{key: 'masterpassx', storage},
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
				<div className="w-100 d-flex align-items-center pt-3 pb-2 px-2">
					<div className="container">
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
					</div>
				</div>
			</BrowserRouter>
		)
	}
})