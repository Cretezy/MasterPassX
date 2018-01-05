import React from "react";
import {Card, NavItem, NavLink} from "reactstrap";
import {AddUserForm} from "../components/AddUserForm";
import {Footer} from "../components/Footer";
import {HelpText} from "../components/HelpText";
import {connect} from "react-redux";
import {addUser} from "../redux/users";
import {Navbar} from "../components/Navbar";

export const AddUser = connect(null, dispatch => ({
	addUser(name, key, save) {
		dispatch(addUser(name, key, save))
	}
}))(class AddUser extends React.Component {
	state = {
		showHelp: false
	};

	onToggleHelp() {
		this.setState(state => ({showHelp: !state.showHelp}));
	}

	render() {
		return (
			<div>
				<Navbar title="Add User" onToggleHelp={this.onToggleHelp.bind(this)}>
					<NavItem>
						<NavLink onClick={() => this.props.history.push("/")}>Back</NavLink>
					</NavItem>
				</Navbar>

				<div className="normal-container content-navbar">
					<HelpText isOpen={this.state.showHelp}>
						By adding a user to MasterPassX, it creating a master key to which
						it derives passwords from. This key is <i>only</i> store on this
						local device and <strong>never</strong> sent over the network.
					</HelpText>

					<Card body className="m-1">
						<AddUserForm
							done={(name, key, save) => {
								this.props.addUser(name, key, save);
								this.props.history.push("/");
							}}
						/>
					</Card>
					<Footer/>
				</div>
			</div>
		);
	}
});
