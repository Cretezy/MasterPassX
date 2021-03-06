import React from "react";

import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { setDomain } from "../store/session";

import { Welcome } from "./Welcome";
import { Generate } from "./Generate";
import { About } from "./About";
import { getHasUsers } from "../store/users.selectors";

export const Router = connect(
	state => ({ hasUsers: getHasUsers(state) }),
	dispatch => ({ setDomain: domain => dispatch(setDomain(domain)) })
)(function Router({ hasUsers, setDomain }) {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path="/"
					component={hasUsers ? Generate : Welcome}
				/>
				<Route
					exact
					path="/generate/:domain"
					component={({ match }) => {
						// Add param in path to session store
						setDomain(match.params.domain);
						return <Redirect to={{ pathname: "/" }} />;
					}}
				/>
				<Route exact path="/about" component={About} />
				<Route
					path="*"
					component={() => <Redirect to={{ pathname: "/" }} />}
				/>
			</Switch>
		</BrowserRouter>
	);
});
