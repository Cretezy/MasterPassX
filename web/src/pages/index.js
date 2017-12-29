import React from "react";

import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {setDomain} from "../redux/session";

import {Welcome} from "./Welcome";
import {Generate} from "./Generate";
import {AddUser} from "./AddUser";
import {About} from "./About";

export const Router = connect(
	state => ({users: state.users.users}),
	dispatch => ({setDomain: domain => dispatch(setDomain(domain))})
)(
	class Router extends React.Component {
		render() {
			const hasUsers = !!Object.keys(this.props.users).length;
			return (
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={hasUsers ? Generate : Welcome}/>
						<Route exact path="/add" component={AddUser}/>
						<Route
							exact
							path="/generate/:domain"
							component={({match}) => {
								// Add param in path to session store
								this.props.setDomain(match.params.domain);
								return <Redirect to={{pathname: "/"}}/>;
							}}
						/>
						<Route exact path="/about" component={About}/>
						<Route
							path="*"
							component={() => <Redirect to={{pathname: "/"}}/>}
						/>
					</Switch>
				</BrowserRouter>
			);
		}
	}
);
