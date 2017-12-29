import React from "react";
import {
	Card,
	Nav,
	Navbar,
	NavbarBrand,
	NavItem,
	NavLink
} from "reactstrap";

export function About({history}) {
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

			<div className="normal-container content-navbar p-1">
				<Card body>
					<p className="text-center">
						MasterPassX is free as in beer (no money) and as in freedom
						(open source). It is shared under the MIT license and can be{" "}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/Cretezy/MasterPassX"
						>
							viewed on Github
						</a>{" "}
						with more information. It is based upon the original{" "}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="http://masterpasswordapp.com"
						>
							MasterPassword
						</a>{" "}
						algorithm and idea.
					</p>
				</Card>
			</div>
		</div>
	);
}
