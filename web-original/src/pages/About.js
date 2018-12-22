import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { AboutText } from "../components/AboutText";

export function About({ history }) {
	return (
		<div>
			<Navbar color="dark" dark>
				<div className="container normal-container">
					<NavbarBrand href="#">About</NavbarBrand>
					<Nav navbar>
						<NavItem>
							<NavLink onClick={() => history.push("/")}>
								Back
							</NavLink>
						</NavItem>
					</Nav>
				</div>
			</Navbar>

			<div className="normal-container content-navbar">
				<div className="p-1">
					<AboutText />
				</div>
			</div>
		</div>
	);
}
