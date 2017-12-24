import React from 'react';
import {
	Button, Form, FormGroup, Label, Col, Input, Row, Tooltip, FormText
} from 'reactstrap';
import {createKey} from "masterpassx-core";
import {addUser} from "./actions";
import {connect} from "react-redux";

export default connect(
	null,
	dispatch => ({
		addUser(name, key, save) {
			dispatch(addUser(name, key, save))
		}
	})
)(class AddUserForm extends React.Component {
	static defaultProps = {
		done: () => {
		},
	};

	state = {
		name: "",
		master: "",
		loading: false,
		save: true,
		saveTooltipOpen: false,
		nameError: null,
		passwordError: null,
		passwordErrorTimer: null,
	};
	nameErrorTimer;
	passwordErrorTimer;

	onSubmit(event) {
		event.preventDefault();
		const {name, master} = this.state;
		if (name.length > 0 && master.length > 0) {
			this.setState({loading: true});
			// Let UI update before creating key (CPU intensive, blocks for ~0.5s)
			setTimeout(async () => {
				const key = await createKey(name, master);
				this.props.addUser(name, key, this.state.save);
				this.props.done()
			}, 25);
		}
	}

	onChangeName(event) {
		const name = event.target.value;
		this.setState({
			name
		});
		if (this.nameErrorTimer) {
			clearTimeout(this.nameErrorTimer);
		}

		const errors = [];
		if (name !== name.trim()) {
			errors.push("Careful! Name starts or finishes with whitespace.")
		}

		if (errors.length > 0) {
			this.nameErrorTimer = setTimeout(() => {
				this.setState({nameError: errors.join(" ")})
			}, 1000);
		} else {
			this.setState({nameError: null})
		}
	}

	onChangeMaster(event) {
		const master = event.target.value;
		this.setState({
			master
		});
		if (this.passwordErrorTimer) {
			clearTimeout(this.passwordErrorTimer);
		}

		const errors = [];
		if (master.length < 6) {
			errors.push("Careful! Password is too short. We recommend at least 12 characters.")
		} else if (master.length < 10) {
			errors.push("Careful! Password is short, but will work. We recommend at least 12 characters.")
		}

		if (errors.length > 0) {
			this.passwordErrorTimer = setTimeout(() => {
				this.setState({passwordError: errors.join(" ")})
			}, 1000);
		} else {
			this.setState({passwordError: null})
		}

	}

	onSaveChange() {
		this.setState(state => ({
			save: !state.save
		}))
	}

	toggleSaveTooltip() {
		this.setState(state => ({
			saveTooltipOpen: !state.saveTooltipOpen
		}));
	}

	render() {
		return (
			<Form onSubmit={this.onSubmit.bind(this)} autoComplete="new-password" className="text-left">
				<FormGroup row>
					<Label for="name" sm={4} className="text-sm-right text-center">Full Name</Label>
					<Col sm={8}>
						<Input
							name="name"
							autoCorrect="off"
							spellCheck="false"
							autoComplete="new-password"
							value={this.state.name}
							onChange={this.onChangeName.bind(this)}
						/>
						<FormText>
							{this.state.nameError || "This will need to match exactly on other devices."}
						</FormText>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="master" sm={4} className="text-sm-right text-center">Master Password</Label>
					<Col sm={8}>
						<Input
							name="master"
							id="master"
							type="password"
							autoComplete="new-password"
							value={this.state.master}
							onChange={this.onChangeMaster.bind(this)}
						/>
						<FormText>
							{this.state.passwordError || "Use a long and hard to guess password (or passphrase)."}
						</FormText>
					</Col>
				</FormGroup>


				<Row noGutters>
					<Col className="p-1 text-center" xs={12} sm={this.props.back ? 4 : 6}>
						<FormGroup check>
							<Label check for="save" className="pt-2">
								<Input
									type="checkbox"
									name="save"
									id="save"
									checked={this.state.save}
									onChange={this.onSaveChange.bind(this)}
								/>
								<a id="saveLabel" className="tooltip-label">Save User</a>
								<Tooltip
									placement="top"
									isOpen={this.state.saveTooltipOpen}
									target="saveLabel"
									toggle={this.toggleSaveTooltip.bind(this)}>
									Enabling saving allows you to keep the user saved (no need to retype name & master
									password on every load), and only stores the generated key from name & master
									password (it does not store the master password).
									Disable this if you are using a shared computer and don't want others
									to generate passwords for you.
								</Tooltip>
							</Label>
						</FormGroup>
					</Col>
					{this.props.back &&
					<Col className="p-1" xs={6} sm={4}>
						<Button
							block
							onClick={this.props.back}
						>
							Back
						</Button>
					</Col>
					}
					<Col className="p-1" xs={this.props.back ? 6 : 12}
					     sm={this.props.back ? 4 : 6}>
						<Button
							type="submit"
							block color="success"
							disabled={this.state.loading}
						>
							Create User
						</Button>
					</Col>
				</Row>
			</Form>
		);
	}
});
