import React from "react";
import { Card, Collapse } from "reactstrap";

export function Help({ isOpen, children }) {
	return (
		<Collapse isOpen={isOpen}>
			<div className="p-1">
				<Card body>
					<p className="text-center">{children}</p>
				</Card>
			</div>
		</Collapse>
	);
}
