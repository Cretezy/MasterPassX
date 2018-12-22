import React from "react";
import { Badge, Nav, NavItem, NavLink } from "reactstrap";

export function NavbarHelpButton({ onToggleHelp }) {
	return (
		<Nav navbar className="mr-auto">
			<NavItem>
				<NavLink onClick={onToggleHelp}>
					<Badge color="secondary" pill>
						?
					</Badge>
				</NavLink>
			</NavItem>
		</Nav>
	);
}
