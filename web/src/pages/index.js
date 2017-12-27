import React from "react";
import Generate from "./Generate";
import AddUser from "./AddUser";
import { Welcome } from "./Welcome";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { setDomain } from "../redux/session";

export const Router = connect(
	state => ({ users: state.users.users }),
	dispatch => ({ setDomain: domain => dispatch(setDomain(domain)) })
)(
	class Router extends React.Component {
		render() {
			const hasUsers = !!Object.keys(this.props.users).length;
			return (
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={hasUsers ? Generate : Welcome} />
						<Route exact path="/add" component={AddUser} />
						<Route
							exact
							path="/generate/:domain"
							component={({ match }) => {
								this.props.setDomain(match.params.domain);
								return <Redirect to={{ pathname: "/" }} />;
							}}
						/>
						<Route
							path="*"
							component={() => <Redirect to={{ pathname: "/" }} />}
						/>
					</Switch>
				</BrowserRouter>
			);
		}
	}
);
