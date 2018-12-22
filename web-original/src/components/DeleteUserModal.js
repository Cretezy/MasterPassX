import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function DeleteUserModel({ open, onToggle, onDelete, name }) {
	return (
		<Modal isOpen={open} toggle={onToggle}>
			<ModalHeader toggle={onToggle}>Delete User</ModalHeader>
			<ModalBody>Are you sure you want to delete {name}?</ModalBody>
			<ModalFooter>
				<Button color="danger" onClick={onDelete}>
					Delete
				</Button>{" "}
				<Button color="secondary" onClick={onToggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}
