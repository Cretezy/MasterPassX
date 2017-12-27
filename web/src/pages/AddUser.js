import React from "react";
import {
	Badge,
	Card,
	Collapse,
	Nav,
	Navbar,
	NavbarBrand,
	NavItem,
	NavLink
} from "reactstrap";
import AddUserForm from "../components/AddUserForm";

export default class AddUser extends React.Component {
	state = {
		showHelp: false
	};

	onToggleShowHelp() {
		this.setState(state => ({ showHelp: !state.showHelp }));
	}

	render() {
		return (
			<div>
				<Navbar color="dark" dark>
					<div className="container normal-container">
						<NavbarBrand href="#">Add User</NavbarBrand>
						<Nav navbar className="mr-auto">
							<NavItem>
								<NavLink onClick={this.onToggleShowHelp.bind(this)}>
									<Badge color="secondary" pill>
										?
									</Badge>
								</NavLink>
							</NavItem>
						</Nav>
						<Nav navbar>
							<NavItem>
								<NavLink onClick={() => this.props.history.push("/")}>
									Back
								</NavLink>
							</NavItem>
						</Nav>
					</div>
				</Navbar>

				<div className="normal-container content-navbar">
					<Collapse isOpen={this.state.showHelp}>
						<div className="p-1">
							<Card body>
								<p className="text-center">
									By adding a user to MasterPassX, it creating a master key to
									which it derives passwords from. This key is <i>only</i> store
									on this local device and <strong>never</strong> sent over the
									network.
								</p>
							</Card>
						</div>
					</Collapse>
					<Card body className="m-1">
						<AddUserForm
							back={false}
							done={() => this.props.history.push("/")}
						/>
					</Card>
				</div>
			</div>
		);
	}
}
