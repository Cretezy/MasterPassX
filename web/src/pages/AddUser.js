import React from "react";
import {
	Card, Nav, Navbar, NavbarBrand, NavItem, NavLink,
} from "reactstrap";
import AddUserForm from "../components/AddUserForm";

export default class AddUser extends React.Component {
	render() {
		return (
			<div>
				<Navbar color="dark" dark>
					<div className="container normal-container">
						<NavbarBrand href="#">Add User</NavbarBrand>
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
					<p className="text-center">
						By adding a user to MasterPassX, it creating a master key to which
						it derives passwords from. This key is <i>only</i> store on this
						local device and <strong>never</strong> sent over the network.
					</p>
					<Card body>
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
