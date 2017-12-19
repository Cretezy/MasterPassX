import React from 'react';
import {
	Button, Input, Col, Label, FormGroup, Form, Collapse, Card, Row, InputGroupButton, InputGroup,
	Tooltip
} from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {connect} from "react-redux";
import {createPassword, createSeed, templates} from "masterpassx-core";

export default connect(state => ({
	currentUser: state.users.currentUser
}))(class Generate extends React.Component {
	initialState = {
		password: "",
		site: "",
		counter: 1,
		type: "long",
		showOptions: false,
		counterTooltipOpen: false,
		copied: false,
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

	onIncrement(increment) {
		return () => this.setState(state => ({counter: state.counter + increment}), this.generate);
	}

	onToggleShowOptions() {
		this.setState(state => ({showOptions: !state.showOptions}));
	}

	toggleCounterTooltip() {
		this.setState(state => ({
			counterTooltipOpen: !state.counterTooltipOpen
		}));
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

		this.setState(state => ({password, copied: password !== "" && state.password === password}));
	}

	onReset() {
		this.setState(state => ({...this.initialState, showOptions: state.showOptions}));
	}

	onCopy() {
		this.setState({copied: true})
	}

	render() {
		return (
			<div>
				<header className="text-center">
					<h3>
						Generate Password
					</h3>
				</header>
				<Card body>
					<Form noValidate>
						<FormGroup row className="p-1">
							<Label for="site" sm={2} className="text-sm-right text-center">Site</Label>
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
						<div className="password-container w-100 my-3 text-center">
							<samp
								className={"d-inline-block w-100 password " + (this.state.password ? "password-active" : "password-idle")}
							>
								{this.state.password || "Enter site to start..."}
							</samp>
						</div>
						<Row noGutters>
							<Col className="p-1" xs={5}>
								<CopyToClipboard text={this.state.password} onCopy={this.onCopy.bind(this)}>
									<Button block color="primary" disabled={!this.state.password || this.state.copied}>
										Copy {this.state.copied && '✓'}
									</Button>
								</CopyToClipboard>
							</Col>
							<Col className="p-1" xs={5}>
								<Button
									block color="danger"
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
							<Col className="p-1" xs={2}>
								<Button
									block color="warning"
									onClick={() => this.props.history.push('/settings')}
								>
									⚙
								</Button>
							</Col>
						</Row>
						<div className="m-1">
							<Button block onClick={this.onToggleShowOptions.bind(this)}>
								{this.state.showOptions ? "Hide" : "Show"} Options
							</Button>
						</div>
						<Collapse isOpen={this.state.showOptions}>
							<div className="pt-3">
								<FormGroup row className="p-1">
									<Label for="type" sm={3} className="text-sm-right text-center">Type</Label>
									<Col sm={9}>
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
								<FormGroup row className="p-1">
									<Label for="counter" sm={3} className="text-sm-right text-center">
										<a href="#" id="counterLabel" className="tooltip-label">Counter</a>
										<Tooltip
											placement="top"
											isOpen={this.state.counterTooltipOpen}
											target="counterLabel"
											toggle={this.toggleCounterTooltip.bind(this)}>
											Increment this when needing a new password for the same site
										</Tooltip>
									</Label>
									<Col sm={9}>
										<InputGroup>
											<Input
												name="counter"
												type="number"
												min="1"
												value={this.state.counter}
												onChange={this.onCounterChange.bind(this)}
											/>
											<InputGroupButton>
												<Button color="success"
												        onClick={this.onIncrement(1).bind(this)}>+</Button>
												<Button color="danger" disabled={this.state.counter <= 1}
												        onClick={this.onIncrement(-1).bind(this)}>-</Button>
											</InputGroupButton>
										</InputGroup>
									</Col>
								</FormGroup>
							</div>
						</Collapse>
					</Form>
				</Card>


			</div>
		);
	}
})
