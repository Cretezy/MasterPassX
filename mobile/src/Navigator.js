import React from "react";
import { connect } from "react-redux";
import { getHasUsers } from "./store/users.selectors";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { StackNavigator } from "react-navigation";
import { GenerateScreen } from "./screens/GenerateScreen";
import { UsersScreen } from "./screens/UsersScreen";
import { ScanScreen } from "./screens/ScanScreen";
import { primary } from "./color";
import { Keyboard } from "react-native";

const navigatorOptions = {
	onTransitionStart() {
		Keyboard.dismiss()
	},
	navigationOptions: {
		headerStyle: {
			backgroundColor: primary[500]
		},
		headerTitleStyle: {
			color: "#ffffff"
		},
		headerTintColor: "#ffffff"
	}
};

const MainStackNavigator = StackNavigator(
	{
		Generate: {
			screen: GenerateScreen
		},
		Users: {
			screen: UsersScreen
		},
		Scan: {
			screen: ScanScreen
		}
	},
	navigatorOptions
);

const WelcomeStackNavigator = StackNavigator(
	{
		Welcome: {
			screen: WelcomeScreen
		},
		Scan: {
			screen: ScanScreen
		}
	},
	navigatorOptions
);

@connect(state => ({ hasUsers: getHasUsers(state) }))
export class RootNavigator extends React.PureComponent {
	render() {
		if (this.props.hasUsers) {
			return <MainStackNavigator />
		} else {
			return <WelcomeStackNavigator />
		}
	}
}
