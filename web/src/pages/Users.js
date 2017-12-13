import React from 'react';
import {
	Button, CardTitle, CardBody, Table, Row, Col
} from 'reactstrap';
import {removeUser, setCurrentUser} from "../actions";
import {connect} from "react-redux";

export default connect(
	state => ({users: state.users.users, currentUser: state.users.currentUser}),
	dispatch => ({
		setCurrentUser(key) {
			dispatch(setCurrentUser(key))
		},
		removeUser(key) {
			dispatch(removeUser(key))
		}
	})
)(class Users extends React.Component {
	setCurrentUser(key) {
		return () => {
			this.props.setCurrentUser(key);
			this.props.history.push("/");
		}
	}

	render() {
		return (
			<CardBody className="text-center">
				<CardTitle>
					Users
				</CardTitle>

				<Table className="text-left" style={{marginBottom: 0}}>
					<tbody>
					{Object.keys(this.props.users).map((key,) => {
						const name = this.props.users[key];
						const current = this.props.currentUser === key;
						return (
							<tr key={"user-" + key}>
								<td>
									<Button
										color="link"
										className="m-1"
										onClick={this.setCurrentUser(key).bind(this)}>
										{current ? <strong>{name}</strong> : name}
									</Button>
								</td>
								<td>
									<div className="float-right">
										<Button
											color="danger"
											className="m-1"
											onClick={
												() => window.confirm("Are you sure you want to delete " + name + "?") &&
													this.props.removeUser(key)
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
								</td>
							</tr>
						);
					})}
					</tbody>
				</Table>
				<hr style={{marginTop: 0}}/>
				<Row>
					<Col className="p-1" sm={6}>
						<Button block onClick={() => this.props.history.push('/')}>
							Back
						</Button>
					</Col>
					<Col className="p-1" sm={6}>
						<Button block color="primary" onClick={() => this.props.history.push('/add')}>
							Add User
						</Button>
					</Col>
				</Row>
			</CardBody>
		);
	}
});
