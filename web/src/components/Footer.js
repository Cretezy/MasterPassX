import React from "react";
import {Link} from "react-router-dom";

export function Footer() {
	return (
		<div className="text-center text-muted pt-2 small">
			<p>&copy; MasterPassX - <Link to="/about" style={{color: "dodgerblue"}}>About</Link></p>
		</div>
	)
}