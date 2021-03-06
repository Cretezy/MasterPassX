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
	onToggleAddUserModal,
	onToggleDeleteUserModal,
	onToggleScanModal,
	users,
	currentUserKey
}) {
	return (
		<Navbar title="Generate" onToggleHelp={onToggleHelp}>
			<UncontrolledDropdown nav>
				<DropdownToggle nav caret>
					Users
				</DropdownToggle>
				<DropdownMenu right>
					{users.map(user => {
						const selected = user.key === currentUserKey;
						return (
							<DropdownItem
								disabled={selected}
								key={"user-" + user.key}
								onClick={() => onSwitchUser(user.key)}
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
					<DropdownItem onClick={onToggleAddUserModal}>
						Add User
					</DropdownItem>
					<DropdownItem onClick={onToggleDeleteUserModal}>
						Delete Current User
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</Navbar>
	);
}
