import React from "react";
import { Input, Col, Label, FormGroup } from "reactstrap";
import { createPassword } from "masterpassx-core";
import { PasswordDisplay } from "./PasswordDisplay";

export class ExampleGenerator extends React.Component {
	state = {
		password: "",
		site: ""
	};

	timer;
	sitesIndex = 0;
	sites = [
		"google.com",
		"facebook.com",
		"twitter.com",
		"reddit.com",
		"amazon.com",
		"netflix.com"
	];

	componentDidMount() {
		// Shuffle sites (Fisher-Yates)
		for (let i = this.sites.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.sites[i], this.sites[j]] = [this.sites[j], this.sites[i]];
		}

		this.timer = setInterval(this.changeSite.bind(this), 2500);
		this.changeSite();
	}

	static generateNewSeed() {
		let seed = "";
		const hexChars = "0123456789abcdef";
		for (let x = 0; x < 64; x++) {
			seed += hexChars.charAt(
				Math.floor(Math.random() * hexChars.length)
			);
		}
		return seed;
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	changeSite() {
		this.generate(this.sites[this.sitesIndex]);

		this.sitesIndex++;
		if (this.sitesIndex >= this.sites.length) {
			this.sitesIndex = 0;
		}
	}

	generate(site) {
		const password = createPassword(
			ExampleGenerator.generateNewSeed(),
			"long"
		);
		this.setState({ password, site });
	}

	render() {
		return (
			<div>
				<FormGroup row className="p-1">
					<Label
						for="site"
						sm={2}
						className="text-sm-right text-center"
					>
						Site
					</Label>
					<Col sm={10}>
						<Input
							name="site"
							type="url"
							className="site"
							noValidate
							value={this.state.site}
							placeholder="example.com"
							disabled
							style={{ backgroundColor: "#ffffff" }}
						/>
					</Col>
				</FormGroup>
				<PasswordDisplay password={this.state.password} />
			</div>
		);
	}
}
