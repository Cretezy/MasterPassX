import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AddUserForm, SaveToggle } from "./AddUserForm";

export class AddUserModel extends React.Component {
	state = {
		loading: false,
		save: true
	};

	form;

	render() {
		return (
			<Modal isOpen={this.props.open} toggle={this.props.onToggle}>
				<ModalHeader toggle={this.props.onToggle}>Add User</ModalHeader>
				<ModalBody>
					<AddUserForm
						hide
						// I know this is a mess... it's because with wrap with
						// withRouter(connect(AddUserForm)), and sometimes
						// the ref is null???
						wrappedComponentRef={ref => {
							if (ref) {
								this.form = ref.getWrappedInstance();
							}
						}}
						onSetLoading={() => this.setState({ loading: true })}
						onSetSave={save => this.setState({ save })}
						done={() => {
							this.props.onAdd();
							this.setState({ save: true, loading: false });
							this.form = null;
						}}
					/>
				</ModalBody>
				<ModalFooter>
					<div className="mr-auto text-center text-md-left">
						<SaveToggle
							save={this.state.save}
							onSaveChange={() => this.form.onChangeSave()}
						/>
					</div>
					<div className="text-right">
						<Button
							color="success"
							disabled={this.state.loading}
							onClick={() => this.form.onSubmit()}
							className="mt-1 mt-sm-0"
						>
							Create User
						</Button>{" "}
						<Button
							color="secondary"
							onClick={this.props.onToggle}
							className="mt-1 mt-sm-0"
						>
							Cancel
						</Button>
					</div>
				</ModalFooter>
			</Modal>
		);
	}
}
