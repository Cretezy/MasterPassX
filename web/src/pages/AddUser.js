import React from 'react';
import {
	Button, Form, FormGroup, Label, Col, Input, CardBody, CardTitle, Row, CardText
} from 'reactstrap';
import {createKey} from "../core";
import {addUser} from "../actions";
import {connect} from "react-redux";

export default connect(
	null,
	dispatch => ({
		addUser(name, key) {
			dispatch(addUser(name, key))
		}
	})
)(class AddUser extends React.Component {
	state = {
		name: "",
		master: "",
		loading: false,
	};

	onSubmit(event) {
		event.preventDefault();
		const {name, master} = this.state;
		if (name.length > 0 && master.length > 0) {
			this.setState({loading: true});
			// Let UI update before creating key (CPU intensive, blocks for ~0.5s)
			setTimeout(async () => {
				const key = await createKey(name, master);
				this.props.addUser(name, key);
				this.props.history.push('/');
			}, 20);
		}
	}

	onChangeName(event) {
		this.setState({
			name: event.target.value
		})
	}

	onChangeMaster(event) {
		this.setState({
			master: event.target.value
		})
	}

	render() {
		return (
			<CardBody className="text-center">
				<CardTitle>Add User</CardTitle>
				<CardText>
					By adding a user to MasterPassX, it creating a master key to which it derives passwords from. This
					key is <i>only</i> store on this local device and <strong>never</strong> sent over the network.
				</CardText>
				<hr/>

				<Form onSubmit={this.onSubmit.bind(this)} autoComplete="new-password">
					<FormGroup row>
						<Label for="name" sm={4}>Full Name</Label>
						<Col sm={8}>
							<Input
								name="name"
								autoCorrect="off"
								spellCheck="false"
								autoComplete="new-password"
								value={this.state.name}
								onChange={this.onChangeName.bind(this)}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="master" sm={4}>Master Password</Label>
						<Col sm={8}>
							<Input
								name="master"
								type="password"
								autoComplete="new-password"
								value={this.state.master}
								onChange={this.onChangeMaster.bind(this)}
							/>
						</Col>
					</FormGroup>
				</Form>
				<hr/>

				<Row>
					<Col className="p-1" sm={6}>
						<Button
							block
							onClick={() => this.props.history.push('/users')}
						>
							Back
						</Button>
					</Col>
					<Col className="p-1" sm={6}>
						<Button
							block color="success"
							disabled={this.state.loading}
							onClick={this.onSubmit.bind(this)}
						>
							Create User
						</Button>
					</Col>
				</Row>
			</CardBody>
		);
	}
});
