import React from 'react';
import {
	Button, Input, Col, Label, FormGroup, CardBody, CardTitle, Form, Collapse, Card, Row
} from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {connect} from "react-redux";
import {createPassword, createSeed, templates} from "../core";

export default connect(state => ({
	users: state.users.users,
	currentUser: state.users.currentUser
}))(class Generate extends React.Component {
	initialState = {
		password: "",
		site: "",
		counter: 1,
		type: "long",
		showOptions: false,
	};

	state = this.initialState;

	onSiteChange(event) {
		const site = event.target.value;
		this.setState({site}, this.generate);
	}

	onTypeChange(event) {
		const type = event.target.value;
		this.setState({type}, this.generate);
	}

	onCounterChange(event) {
		const counter = parseInt(event.target.value, 10) || 1;
		this.setState({counter}, this.generate);
	}

	onToggleShowOptions() {
		this.setState(state => ({showOptions: !state.showOptions}));
	}

	generate() {
		const {site, type, counter} = this.state;

		let password;
		if (site !== "") {
			const seed = createSeed(this.props.currentUser, site, counter);
			password = createPassword(seed, type);
		} else {
			password = ""
		}

		this.setState({password});
	}

	onReset() {
		this.setState(state => ({...this.initialState, showOptions: state.showOptions}));
	}

	render() {
		return (
			<CardBody className="text-center">
				<CardTitle>
					Generate Password
				</CardTitle>

				<Form noValidate>
					<FormGroup row>
						<Label for="site" sm={2}>Site</Label>
						<Col sm={10}>
							<Input
								name="site"
								type="url"
								className="site"
								noValidate
								value={this.state.site}
								onChange={this.onSiteChange.bind(this)}
								placeholder="example.com"
							/>
						</Col>
					</FormGroup>
					<Row>
						<Col className="p-1" sm={6}>
							<Button block onClick={this.onToggleShowOptions.bind(this)}>
								{this.state.showOptions ? "Hide" : "Show"} Options
							</Button>
						</Col>
						<Col className="p-1" sm={6}>
							<Button
								block color="primary"
								onClick={this.onReset.bind(this)}
								disabled={
									this.state.site === this.initialState.site &&
									this.state.type === this.initialState.type &&
									this.state.counter === this.initialState.counter
								}
							>
								Reset
							</Button>
						</Col>
					</Row>
					<Collapse isOpen={this.state.showOptions}>
						<hr/>
						<Card body>
							<FormGroup row>
								<Label for="type" sm={4}>Type</Label>
								<Col sm={8}>
									<Input
										name="type"
										type="select"
										value={this.state.type}
										onChange={this.onTypeChange.bind(this)}
									>
										{Object.keys(templates).map(type => {
											const name = templates[type];
											return <option key={"type-" + type} value={type}>{name}</option>
										})}
									</Input>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="counter" sm={4}>Counter</Label>
								<Col sm={8}>
									<Input
										name="counter"
										type="number"
										min="1"
										value={this.state.counter}
										onChange={this.onCounterChange.bind(this)}
									/>
								</Col>
							</FormGroup>
						</Card>
					</Collapse>
				</Form>

				<hr/>

				<div style={{width: "100%", marginBottom: "10px"}}>
					<samp
						className="password"
						style={{color: this.state.password ? "#bd4147" : "#f8a9ad"}}
					>
						{this.state.password || "Enter site to start..."}
					</samp>
				</div>

				<Row>
					<Col className="p-1" sm={6}>
						<CopyToClipboard text={this.state.password}>
							<Button block color="success" disabled={!this.state.password}>
								Copy
							</Button>
						</CopyToClipboard>
					</Col>
					<Col className="p-1" sm={6}>
						<Button
							block color="info"
							onClick={() => this.props.history.push('/users')}
						>
							{this.props.users[this.props.currentUser]} (change user)
						</Button>
					</Col>
				</Row>
			</CardBody>
		);
	}
})