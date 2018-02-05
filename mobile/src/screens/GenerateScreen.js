import React from "react";

import { connect } from "react-redux";
import { createPassword, createSeed, templates } from "masterpassx-core";
import { PasswordDisplay } from "../components/PasswordDisplay";
import { getCurrentUserKey } from "../store/users.selectors";
import { View, Clipboard, Platform, Picker, ScrollView } from "react-native";
import { FormLabel, FormInput, Card } from "react-native-elements";
import autobind from "autobind-decorator";
import { Item, Row } from "../components/Grid";
import { Button } from "../components/Button";
import { primary, secondary } from "../color";
import Collapsible from "react-native-collapsible";

@connect(state => ({
	currentUserKey: getCurrentUserKey(state)
}))
export class GenerateScreen extends React.Component {
	static navigationOptions = {
		title: "Generate"
	};

	initialState = {
		password: "",
		site: "",
		counter: 1,
		type: "long",
		showOptions: false,
		copied: false
	};

	state = { ...this.initialState };

	@autobind
	onSiteChange(site) {
		this.setState({ site }, this.generate);
	}

	@autobind
	onTypeChange(type) {
		this.setState({ type }, this.generate);
	}

	@autobind
	onCounterChange(count) {
		const counter = parseInt(count, 10);
		this.setState({ counter }, this.generate);
	}

	@autobind
	onIncrement(increment) {
		return () =>
			this.setState(
				state => ({ counter: (state.counter || 0) + increment }),
				this.generate
			);
	}

	@autobind
	onToggleShowOptions() {
		this.setState(state => ({ showOptions: !state.showOptions }));
	}

	generate() {
		setTimeout(() => {
			const { site, type, counter } = this.state;

			let password;
			if (site !== "") {
				const seed = createSeed(
					this.props.currentUserKey,
					site,
					counter || 1
				);
				password = createPassword(seed, type);
			} else {
				password = "";
			}

			this.setState(state => ({
				password,
				copied: password !== "" && state.password === password
			}));
		});
	}

	@autobind
	onReset() {
		this.setState(state => ({
			...this.initialState,
			showOptions: state.showOptions
		}));
	}

	@autobind
	onCopy() {
		Clipboard.setString(this.state.password);
		this.setState({ copied: true });
	}

	render() {
		return (
			<ScrollView>
				<FormLabel>Site</FormLabel>
				<FormInput
					keyboardType={
						Platform.OS === "ios" ? "url" : "email-address"
					}
					autoCorrect={false}
					autoCapitalize="none"
					value={this.state.site}
					onChangeText={this.onSiteChange}
					placeholder="example.com"
					autoFocus
				/>
				<PasswordDisplay password={this.state.password} />

				<Row>
					<Item>
						<Button
							icon={{
								name: this.state.copied
									? "clipboard-check"
									: "clipboard"
							}}
							backgroundColor="blue"
							disabled={!this.state.password || this.state.copied}
							onPress={this.onCopy}
							title={"Copy"}
						/>
					</Item>
					<Item>
						<Button
							icon={{ name: "close" }}
							backgroundColor="red"
							onPress={this.onReset}
							disabled={
								this.state.site === this.initialState.site &&
								this.state.type === this.initialState.type &&
								this.state.counter === this.initialState.counter
							}
							title="Reset"
						/>
					</Item>
				</Row>
				<View style={{ height: 20 }} />
				<Button
					backgroundColor={primary[500]}
					onPress={this.onToggleShowOptions}
					icon={{ name: "settings" }}
					title={
						(this.state.showOptions ? "Hide" : "Show") + " Options"
					}
				/>

				<Collapsible collapsed={!this.state.showOptions} duration={500}>
					<Card style={{ marginButton: 10 }}>
						<Row>
							<Item>
								<FormLabel>Type</FormLabel>
							</Item>
							<Item>
								<Picker
									selectedValue={this.state.type}
									onValueChange={this.onTypeChange}
								>
									{Object.keys(templates).map(type => (
										<Picker.Item
											label={templates[type]}
											key={"type-" + type}
											value={type}
										/>
									))}
								</Picker>
							</Item>
						</Row>
						<Row>
							<Item size={2}>
								<FormLabel>Counter</FormLabel>
							</Item>
							<Item size={2}>
								<FormInput
									textAlign="center"
									value={
										isNaN(this.state.counter)
											? ""
											: this.state.counter.toString()
									}
									onChangeText={this.onCounterChange}
									keyboardType="numeric"
									inputStyle={{ width: 50 }}
								/>
							</Item>
							<Item>
								<Button
									backgroundColor="green"
									onPress={this.onIncrement(1)}
									title="+"
									containerViewStyle={{
										marginRight: 2,
										marginHorizontal: 0
									}}
								/>
							</Item>
							<Item>
								<Button
									backgroundColor="red"
									disabled={(this.state.counter || 1) <= 1}
									onPress={this.onIncrement(-1)}
									title="-"
									containerViewStyle={{
										marginLeft: 2,
										marginHorizontal: 0
									}}
								/>
							</Item>
						</Row>
					</Card>
				</Collapsible>

				<View style={{ height: 20 }} />
				<Button
					backgroundColor={secondary[500]}
					onPress={() => this.props.navigation.navigate("Users")}
					icon={{ name: "account-multiple" }}
					title="Users"
				/>
				<View style={{ height: 20 }} />
			</ScrollView>
		);
	}
}
