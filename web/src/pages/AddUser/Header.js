import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { NavbarHelpButton } from "../../components/NavbarHelpButton";

export function Header({ onToggleHelp, onBack }) {
	return (
		<Navbar color="dark" dark>
			<div className="container normal-container">
				<NavbarBrand href={"#"}>Add User</NavbarBrand>
				<NavbarHelpButton onToggleHelp={onToggleHelp} />
				<Nav navbar>
					<NavItem>
						<NavLink onClick={onBack}>Back</NavLink>
					</NavItem>
				</Nav>
			</div>
		</Navbar>
	);
}
