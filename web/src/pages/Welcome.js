import React from 'react';
import {
	Button, CardBody, CardTitle
} from 'reactstrap';

export default class Welcome extends React.Component {
	render() {
		return (
			<CardBody className="text-center">
				<CardTitle>Welcome to MasterPassX</CardTitle>
				<hr/>

				<p>
					A deterministic stateless password generator.
				</p>

				<hr/>
				<Button
					block color="success"
					onClick={() => this.props.history.push('/add')}
				>
					Create User
				</Button>
			</CardBody>
		);
	}
};
