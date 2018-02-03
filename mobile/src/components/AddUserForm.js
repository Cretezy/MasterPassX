import React from "react";
import { createKey } from "masterpassx-core";
import { connect } from "react-redux";
import zxcvbn from "zxcvbn";
import autobind from "autobind-decorator";
import { addUser } from "../store/users.actions";
import { View } from "react-native";
import { Button, FormInput, FormLabel, Text } from "react-native-elements";
import { withNavigation } from "react-navigation";

@withNavigation
@connect(null, dispatch => ({
	addUser(name, key) {
		dispatch(addUser(name, key));
	}
}))
export class AddUserForm extends React.Component {
	state = {
		name: "",
		master: "",
		loading: false,
		nameError: null,
		passwordStrength: "",
		passwordStrengthColor: null,
		passwordStrengthScore: null
	};

	nameErrorTimer;

	@autobind
	onSubmit() {
		const { name, master, passwordStrengthScore } = this.state;
		if (
			name.length > 0 &&
			master.length > 0 &&
			passwordStrengthScore >= 2
		) {
			this.setState({ loading: true });
			// Let UI update before creating key (CPU intensive, blocks for ~0.5s)
			setTimeout(async () => {
				// Is very slow on development mode...
				const key = await createKey(name, master);
				this.setState({ loading: false });
				this.props.addUser(name, key);
				if (this.props.done) {
					this.props.done();
				}
			}, 25);
		}
	}

	@autobind
	onChangeName(name) {
		this.setState({
			name
		});
		if (this.nameErrorTimer) {
			clearTimeout(this.nameErrorTimer);
		}

		const errors = [];
		if (name !== name.trim()) {
			errors.push("Careful! Name starts or finishes with whitespace.");
		}

		if (errors.length > 0) {
			this.nameErrorTimer = setTimeout(() => {
				this.setState({ nameError: errors.join(" ") });
			}, 1000);
		} else {
			this.setState({ nameError: null });
		}
	}

	@autobind
	updateMaster(master) {
		const strengthState = {};

		const strength = zxcvbn(master, [
			...this.state.name.split(" "),
			this.state.name,
			"master",
			"masterpassx"
		]);

		strengthState.passwordStrength = `Could take ~${
			strength.crack_times_display.offline_slow_hashing_1e4_per_second
			} to crack.`;

		if (strength.feedback) {
			if (strength.feedback.warning) {
				strengthState.passwordStrength +=
					" " + strength.feedback.warning + ".";
			}
			if (strength.feedback.suggestions.length > 0) {
				strengthState.passwordStrength +=
					" " + strength.feedback.suggestions.join(" ");
			}
		}
		const danger = "red";
		const warning = "yellow";
		const primary = "blue";
		const success = "green";

		switch (strength.score) {
			case 0:
				strengthState.passwordStrengthColor = danger;
				break;
			case 1:
				strengthState.passwordStrengthColor = danger;
				break;
			case 2:
				strengthState.passwordStrengthColor = warning;
				break;
			case 3:
				strengthState.passwordStrengthColor = primary;
				break;
			case 4:
				strengthState.passwordStrengthColor = success;
				break;
			default:
				strengthState.passwordStrengthColor = null;
				break;
		}

		strengthState.passwordStrengthScore = strength.score;

		this.setState({
			master,
			...strengthState
		});
	}

	render() {
		return (
			<View>
				<FormLabel>Full Name</FormLabel>
				<FormInput
					value={this.state.name}
					onChangeText={this.onChangeName}
					placeholder="John Smith"
				/>
				<Text>
					{this.state.nameError ||
					"This will need to match exactly on other devices."}
				</Text>
				<FormLabel>Master Password</FormLabel>
				<FormInput
					secureTextEntry
					value={this.state.master}
					onChangeText={this.updateMaster}
					placeholder="*************"
				/>
				<Text
					style={{
						color: this.state.passwordStrengthColor || "black"
					}}
				>
					{this.state.passwordStrength ||
					"Use a long and hard to guess password (or passphrase)."}
				</Text>

				<Button
					backgroundColor="green"
					disabled={this.state.loading}
					onPress={this.onSubmit}
					title={this.state.loading ? "Creating User..." : "Create User"}
				/>

				<Button
					backgroundColor="purple"
					disabled={this.state.loading}
					title="Scan"
					onPress={() => this.props.navigation.navigate("Scan")} />
			</View>
		);
	}
}
