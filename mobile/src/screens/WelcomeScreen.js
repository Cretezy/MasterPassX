import React from "react";
import { AddUserForm } from "../components/AddUserForm";
import { ExampleGenerator } from "../components/ExampleGenerator";
import { Text } from "react-native-elements";
import { View } from "react-native";

// export function WelcomeScreen() {
// 	return (
// 		<div className="text-center">
// 			<div id="banner">
// 				<div className="text-center normal-container">
// 					<h2 className="text-white">MasterPassX</h2>
// 					<h6 className="text-white">
// 						A deterministic stateless password generator.
// 					</h6>
//
// 					<Card body className="mt-5">
// 						<ExampleGenerator />
// 					</Card>
// 				</div>
// 			</div>
// 			<div className="content">
// 				<div className="wide-container">
// 					<Row noGutters>
// 						<Col xs={12} md={4} className="px-md-1">
// 							<Card body>
// 								<CardTitle>Deterministic</CardTitle>
// 								<p>
// 									MasterPassX is a password generator that
// 									deterministically creates password based off
// 									your name, and a single master password. It
// 									will always generate the same output
// 									(password) with the same input (site/service
// 									you are making a password for).
// 								</p>
// 							</Card>
// 						</Col>
// 						<Col
// 							xs={12}
// 							md={4}
// 							className="my-3 my-md-0 mx-0 px-md-1"
// 						>
// 							<Card body>
// 								<CardTitle>Trustless</CardTitle>
// 								<p>
// 									Never trust anything. MasterPassX never
// 									stores or transmits any of your passwords
// 									(including your master password). Passwords
// 									are only generated, displayed, and never
// 									stored.
// 								</p>
// 							</Card>
// 						</Col>
// 						<Col xs={12} md={4} className="px-md-1">
// 							<Card body>
// 								<CardTitle>Safe</CardTitle>
// 								<p>
// 									MasterPass X is not a password manager, it
// 									is a password generator. This makes it
// 									sync-less, while allowing multiple devices
// 									to generate the same password using the
// 									determisitic algorithm. This technology also
// 									makes it never rely on any third-party
// 									services.
// 								</p>
// 							</Card>
// 						</Col>
// 					</Row>
// 				</div>
//
// 				<br />
//
// 				<div className="normal-container">
// 					<Card body>
// 						<h6>Never remember another password.</h6>
// 						<h6>Get started today.</h6>
// 						<div className="mt-2">
// 							<AddUserForm />
// 						</div>
// 					</Card>
//
// 					<br />
//
// 					<AboutText />
// 					<Footer />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export function WelcomeScreen() {
	return (
		<View style={{ padding: 10 }}>
			<AddUserForm />
		</View>
	);
}

WelcomeScreen.navigationOptions = { title: "Welcome" };
