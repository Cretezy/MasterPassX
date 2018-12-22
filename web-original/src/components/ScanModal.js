import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { QRCode } from "react-qr-svg";

export function ScanModal({ open, onToggle, user: { key, name, ...omit } }) {
	return (
		<Modal isOpen={open} toggle={onToggle}>
			<ModalHeader toggle={onToggle}>Scan To Mobile</ModalHeader>
			<ModalBody>
				<QRCode
					style={{ width: "100%" }}
					level="Q"
					fgColor="#343a40"
					value={JSON.stringify({ name, key })}
				/>,
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={onToggle}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
}
