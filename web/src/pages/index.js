import React from "react";
import Generate from "./Generate";
import AddUser from "./AddUser";
import {Welcome} from "./Welcome";
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {setDomain} from "../redux/actions/session";

export const Router = connect(state => ({users: state.users.users}), dispatch => ({setDomain: domain => dispatch(setDomain(domain))}))(
	class Router extends React.Component {
		render() {
			return (
				<BrowserRouter>
					<Switch>
						{Object.keys(this.props.users).length
							?
							<Route
								exact
								path="/"
								component={Generate}
							/>
							:
							<Route
								exact
								path="/"
								component={Welcome}
							/>
						}
						<Route exact path="/add" component={AddUser}/>
						<Route exact path="/generate/:domain" component={({match}) => {
							this.props.setDomain(match.params.domain);
							return (<Redirect to={{pathname: "/"}}/>);
						}}/>
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
