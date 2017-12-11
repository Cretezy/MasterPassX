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
import Users from "./pages/Users";
import {Card} from "reactstrap";

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
				<div className="app">
					<Card  className="container">
						<Switch>
							{Object.keys(this.props.users).length ?
								[
									<Route key="route-home" exact path="/" component={Generate}/>,
									<Route key="route-users" exact path="/users" component={Users}/>
								]
								:
								[
									<Route key="route-welcome" exact path="/" component={Welcome}/>
								]
							}
							<Route exact path="/add" component={AddUser}/>
							<Route path="*" component={() => <Redirect to={{pathname: '/'}}/>}/>
						</Switch>
					</Card>
				</div>
			</BrowserRouter>
		)
	}
})