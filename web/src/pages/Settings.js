import React from "react";
import { Button, Row, Col, Card } from "reactstrap";
import { removeUser, setCurrentUser } from "../redux/actions";
import { connect } from "react-redux";

export default connect(
	state => ({ users: state.users.users, currentUser: state.users.currentUser }),
	dispatch => ({
		setCurrentUser(key) {
			dispatch(setCurrentUser(key));
		},
		removeUser(key) {
			dispatch(removeUser(key));
		}
	})
)(
	class Settings extends React.Component {
		setCurrentUser(key) {
			return () => {
				this.props.setCurrentUser(key);
				this.props.history.push("/");
			};
		}

		render() {
			return (
				<div className="container content">
					<header className="text-center">
						<h3>Settings</h3>
						<p>You may add multiple users to MasterPassX.</p>
					</header>

					<Card body>
						<div className="pb-2">
							{Object.keys(this.props.users).map(key => {
								const name = this.props.users[key].name;
								const current = this.props.currentUser === key;
								return (
									<div
										key={"user-" + key}
										className="m-1 d-flex w-100 justify-content-between"
									>
										<div>
											<Button
												color="link"
												className="m-1"
												onClick={this.setCurrentUser(key).bind(this)}
											>
												{current ? <strong>{name}</strong> : name}
											</Button>
										</div>

										<div>
											<Button
												color="danger"
												className="m-1"
												onClick={() =>
													window.confirm(
														"Are you sure you want to delete " + name + "?"
													) && this.props.removeUser(key)
												}
												aria-label={"Delete " + name}
											>
												<span aria-hidden="true">&times;</span>
											</Button>
											<Button
												color="primary"
												className="m-1"
												onClick={this.setCurrentUser(key).bind(this)}
												aria-label={"Select " + name}
											>
												<span aria-hidden="true">&#65515;</span>
											</Button>
										</div>
									</div>
								);
							})}
						</div>

						<Row noGutters>
							<Col className="p-1" sm={6}>
								<Button block onClick={() => this.props.history.push("/")}>
									Back
								</Button>
							</Col>
							<Col className="p-1" sm={6}>
								<Button
									block
									color="primary"
									onClick={() => this.props.history.push("/add")}
								>
									Add User
								</Button>
							</Col>
						</Row>
					</Card>
				</div>
			);
		}
	}
);
