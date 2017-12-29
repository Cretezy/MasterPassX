import React from "react";
import { Card } from "reactstrap";
import AddUserForm from "../../components/AddUserForm";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import { Help } from "../../components/Help";

export class AddUser extends React.Component {
	state = {
		showHelp: false
	};

	onToggleHelp() {
		this.setState(state => ({ showHelp: !state.showHelp }));
	}

	render() {
		return (
			<div>
				<Header
					onToggleHelp={this.onToggleHelp.bind(this)}
					onBack={() => this.props.history.push("/")}
				/>

				<div className="normal-container content-navbar">
					<Help isOpen={this.state.showHelp}>
						By adding a user to MasterPassX, it creating a master key to which
						it derives passwords from. This key is <i>only</i> store on this
						local device and <strong>never</strong> sent over the network.
					</Help>

					<Card body className="m-1">
						<AddUserForm
							back={false}
							done={() => this.props.history.push("/")}
						/>
					</Card>
					<Footer />
				</div>
			</div>
		);
	}
}
