import React from "react";
import { Card } from "reactstrap";
import AddUserForm from "../AddUserForm";

export default class AddUser extends React.Component {
	render() {
		return (
			<div className="container content">
				<header className="text-center">
					<h3>Add User</h3>
					<p>
						By adding a user to MasterPassX, it creating a master key to which
						it derives passwords from. This key is <i>only</i> store on this
						local device and <strong>never</strong> sent over the network.
					</p>
				</header>

				<Card body>
					<AddUserForm
						back={() => this.props.history.push("/settings")}
						done={() => this.props.history.push("/")}
					/>
				</Card>
			</div>
		);
	}
}
