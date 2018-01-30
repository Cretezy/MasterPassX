import React from "react";
import { connect } from "react-redux";
import { hasUsers } from "./store/users.selectors";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { StackNavigator } from "react-navigation";
import { GenerateScreen } from "./screens/GenerateScreen";
import { UsersScreen } from "./screens/UsersScreen";

const cardStyle = { backgroundColor: "white" };

const MainStackNavigator = StackNavigator(
	{
		Generate: {
			screen: GenerateScreen
		},
		Users: {
			screen: UsersScreen
		}
	},
	{ cardStyle }
);

const WelcomeStackNavigator = StackNavigator(
	{
		Welcome: {
			screen: WelcomeScreen
		}
	},
	{ cardStyle }
);

@connect(state => ({ hasUsers: hasUsers(state) }))
export class RootNavigator extends React.PureComponent {
	render() {
		if (this.props.hasUsers) {
			return <MainStackNavigator />
		} else {
			return <WelcomeStackNavigator />
		}
	}
}
