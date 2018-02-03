import React from "react";
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown
} from "reactstrap";
import { Navbar } from "../../components/Navbar";

export function Header({
	onToggleHelp,
	onSwitchUser,
	addUser,
	onToggleDeleteUserModal,
	onToggleScanModal,
	users,
	currentUser
}) {
	return (
		<Navbar title="Generate" onToggleHelp={onToggleHelp}>
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
					<DropdownItem onClick={onToggleScanModal}>
						Show Scan Code
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={addUser}>Add User</DropdownItem>
					<DropdownItem onClick={onToggleDeleteUserModal}>
						Delete Current User
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</Navbar>
	);
}
