import React from "react";
import { Card, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { AboutText } from "../components/AboutText";

// TODO
export function Security({ history }) {
	return (
		<div>
			<Navbar color="dark" dark>
				<div className="container normal-container">
					<NavbarBrand href="#">Security</NavbarBrand>
					<Nav navbar>
						<NavItem>
							<NavLink onClick={() => history.push("/")}>Back</NavLink>
						</NavItem>
					</Nav>
				</div>
			</Navbar>

			<div className="normal-container content-navbar">
				<Card body className="text-center m-1">
					<p>MasterPassX is extremely secure.</p>
				</Card>
			</div>
		</div>
	);
}
