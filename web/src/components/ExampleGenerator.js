import React from "react";
import { Input, Col, Label, FormGroup } from "reactstrap";
import { createPassword, createSeed } from "masterpassx-core";

export default class ExampleGenerator extends React.Component {
	state = {
		password: "",
		site: ""
	};

	timer;
	sitesIndex = 0;
	sites = ["google.com", "facebook.com", "twitter.com", "reddit.com"];

	componentDidMount() {
		// Generate a random key
		this.key = "";
		const hexChars = "0123456789abcdef";
		for (let x = 0; x < 128; x++) {
			this.key += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
		}

		// Shuffle sites (Fisher-Yates)
		for (let i = this.sites.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.sites[i], this.sites[j]] = [this.sites[j], this.sites[i]];
		}

		this.timer = setInterval(this.changeSite.bind(this), 3000);
		this.changeSite();
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
		const seed = createSeed(this.key, site, 1);
		const password = createPassword(seed, "long");

		this.setState({ password, site });
	}

	render() {
		return (
			<div>
				<FormGroup row className="p-1">
					<Label for="site" sm={2} className="text-sm-right text-center">
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
				<div className="password-container w-100 my-3 text-center">
					<samp className="d-inline-block w-100 password active">
						{this.state.password || "Enter site to start..."}
					</samp>
				</div>
			</div>
		);
	}
}
