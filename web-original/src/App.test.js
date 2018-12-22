import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

describe("App", () => {
	test("renders without crashing", () => {
		const div = document.createElement("div");
		document.body.appendChild(div);
		ReactDOM.render(<App />, div);
	});
});
