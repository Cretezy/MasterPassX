import React from "react";
import { Nav, Navbar as BSNavbar, NavbarBrand } from "reactstrap";
import { NavbarHelpButton } from "./NavbarHelpButton";

export function Navbar({ title, onToggleHelp, children }) {
	return (
		<BSNavbar color="dark" dark>
			<div className="container normal-container">
				<NavbarBrand href={"#"}>{title}</NavbarBrand>
				{onToggleHelp && <NavbarHelpButton onToggleHelp={onToggleHelp} />}
				<Nav navbar>{children}</Nav>
			</div>
		</BSNavbar>
	);
}
