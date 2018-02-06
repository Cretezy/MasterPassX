import React from "react";

import { connect } from "react-redux";
import { createPassword, createSeed } from "masterpassx-core";
import { PasswordDisplay } from "../components/PasswordDisplay";
import { getCurrentUserKey, getHidePasswords } from "../store/users.selectors";
import { View, Clipboard, Platform, ScrollView, TextInput } from "react-native";
import { FormLabel, FormInput, Card, normalize } from "react-native-elements";
import autobind from "autobind-decorator";
import { Item, Row } from "../components/Grid";
import { Button } from "../components/Button";
import { primary, colors, radius, secondary } from "../color";
import { CenterText } from "../components/CenterText";
import { TypePicker } from "../components/TypePicker";

@connect(state => ({
	currentUserKey: getCurrentUserKey(state),
	hidePasswords: getHidePasswords(state)
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
			<ScrollView keyboardShouldPersistTaps="handled">
				<CenterText component={FormLabel}>Site</CenterText>
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
				<PasswordDisplay
					password={
						this.props.hidePasswords
							? this.state.password.replace(/./g, "*")
							: this.state.password
					}
				/>

				<Row>
					<Item>
						<Button
							icon={{
								name: this.state.copied
									? "clipboard-check"
									: "clipboard"
							}}
							backgroundColor={primary.a700}
							disabled={!this.state.password || this.state.copied}
							onPress={this.onCopy}
							title={"Copy"}
						/>
					</Item>
					<Item>
						<Button
							icon={{ name: "close" }}
							backgroundColor={colors.red.a700}
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

				<Card
					style={{ marginButton: 10 }}
					containerStyle={{ borderRadius: radius }}
				>
					<Row>
						<Item>
							<CenterText component={FormLabel}>Type</CenterText>

							<TypePicker
								value={this.state.type}
								onChange={this.onTypeChange}
							/>
						</Item>
						<Item>
							<Item>
								<CenterText component={FormLabel}>
									Counter
								</CenterText>
							</Item>
							<Row>
								<Item>
									<Button
										backgroundColor={colors.red.a400}
										disabled={
											(this.state.counter || 1) <= 1
										}
										onPress={this.onIncrement(-1)}
										title="-"
										containerViewStyle={{
											marginLeft: 2,
											marginRight: 0,
											marginHorizontal: 0
										}}
									/>
								</Item>
								<Item size={1.5}>
									<TextInput
										style={{
											flex: 1,
											fontSize: normalize(14),
											color: "#86939e"
										}}
										textAlign="center"
										underlineColorAndroid="transparent"
										value={
											isNaN(this.state.counter)
												? ""
												: this.state.counter.toString()
										}
										onChangeText={this.onCounterChange}
										keyboardType="numeric"
									/>
								</Item>
								<Item>
									<Button
										backgroundColor={colors.green.a400}
										onPress={this.onIncrement(1)}
										title="+"
										containerViewStyle={{
											marginLeft: 0,
											marginRight: 2,
											marginHorizontal: 0
										}}
									/>
								</Item>
							</Row>
						</Item>
					</Row>
				</Card>

				<View style={{ height: 20 }} />
				<Button
					backgroundColor={secondary.a700}
					onPress={() => this.props.navigation.navigate("Users")}
					icon={{ name: "account-multiple" }}
					title="Users"
				/>
				<View style={{ height: 20 }} />
			</ScrollView>
		);
	}
}
