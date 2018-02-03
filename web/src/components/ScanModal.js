import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function ScanModal({ open, onToggle, name, key }) {
	return (
		<Modal isOpen={open} toggle={onToggle}>
			<ModalHeader toggle={onToggle}>Scan To Mobile</ModalHeader>
			<ModalBody>
				<QRCode value={JSON.stringify({ name, key })} />,
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={onToggle}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
}
