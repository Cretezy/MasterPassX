import React from "react";
import { Card, CardTitle, Col, Row } from "reactstrap";
import AddUserForm from "../../components/AddUserForm";
import ExampleGenerator from "../../components/ExampleGenerator";
import "./index.css";
import {Footer} from "../../components/Footer";

export class Welcome extends React.Component {
	render() {
		return (
			<div className="text-center">
				<div id="banner">
					<div className="text-center normal-container">
						<h2 className="text-white">MasterPassX</h2>
						<h6 className="text-white">
							A deterministic stateless password generator.
						</h6>

						<Card body className="mt-5">
							<ExampleGenerator />
						</Card>
					</div>
				</div>
				<div className="content">
					<div className="wide-container">
						<Row noGutters>
							<Col xs={12} md={4} className="px-md-1">
								<Card body>
									<CardTitle>Deterministic</CardTitle>
									<p>
										MasterPassX is a password generator that deterministically
										creates password based off your name, and a single master
										password. It will always generate the same output (password)
										with the same input (site/service you are making a password
										for).
									</p>
								</Card>
							</Col>
							<Col xs={12} md={4} className="my-3 my-md-0 mx-0 px-md-1">
								<Card body>
									<CardTitle>Trustless</CardTitle>
									<p>
										Never trust anything. MasterPassX never stores or transmits
										any of your passwords (including) your master password.
										Passwords are only generated, displayed, and never stored.
									</p>
								</Card>
							</Col>
							<Col xs={12} md={4} className="px-md-1">
								<Card body>
									<CardTitle>Safe</CardTitle>
									<p>
										MasterPass X is not a password manager, it is a password
										generator. This makes it sync-less, while allowing multiple
										devices to generate the same password using the determisitic
										algorithm. This technology also makes it never rely on any
										third-party services.
									</p>
								</Card>
							</Col>
						</Row>
					</div>

					<br />

					<div className="normal-container">
						<Card body>
							<h6>Never remember another password.</h6>
							<h6>Get started today.</h6>
							<div className="mt-2">
								<AddUserForm hideBackButton />
							</div>
						</Card>

						<br />

						<Card body>
							<p>
								MasterPassX is free as in beer (no money) and as in freedom
								(open source). It is shared under the MIT license and can be{" "}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/Cretezy/MasterPassX"
								>
									viewed on Github
								</a>{" "}
								with more information. It is based upon the original{" "}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="http://masterpasswordapp.com"
								>
									MasterPassword
								</a>{" "}
								algorithm and idea.
							</p>
						</Card>
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}
