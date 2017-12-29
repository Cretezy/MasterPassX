import React from "react";
import "./index.css";

export function PasswordDisplay({ password }) {
	return (
		<div className="password-container w-100 mt-1 text-center">
			<samp
				className={
					"d-inline-block w-100 password " + (password ? "active" : "idle")
				}
			>
				{password || "Enter site to start..."}
			</samp>
		</div>
	);
}
