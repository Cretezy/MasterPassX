import React from "react";
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	UncontrolledDropdown
} from "reactstrap";
import { NavbarHelpButton } from "../../components/NavbarHelpButton";

export function Header({
	onToggleHelp,
	                       onSwitchUser,
	addUser,
	onToggleDeleteUserModal,
	users,
	currentUser
}) {
	return (
		<Navbar color="dark" dark>
			<div className="container normal-container">
				<NavbarBrand href={"#"}>Generate</NavbarBrand>
				<NavbarHelpButton onToggleHelp={onToggleHelp} />
				<Nav navbar>
					<UncontrolledDropdown nav>
						<DropdownToggle nav caret>
							Users
						</DropdownToggle>
						<DropdownMenu right>
							{Object.keys(users).map(key => {
								const user = users[key];
								const selected = key === currentUser;
								return (
									<DropdownItem
										disabled={selected}
										key={"user-" + key}
										onClick={() => onSwitchUser(key)}
									>
										{user.name}
									</DropdownItem>
								);
							})}
							<DropdownItem divider />
							<DropdownItem onClick={addUser}>Add User</DropdownItem>
							<DropdownItem onClick={onToggleDeleteUserModal}>
								Delete Current User
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
			</div>
		</Navbar>
	);
}
