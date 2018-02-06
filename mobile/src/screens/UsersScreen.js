import React from "react";
import { connect } from "react-redux";
import {
	removeUser,
	setCurrentUser,
	toggleHidePasswords
} from "../store/users.actions";
import { View, Alert, StatusBar } from "react-native";
import { List, ListItem } from "react-native-elements";
import {
	getCurrentUser,
	getHidePasswords,
	getUsers
} from "../store/users.selectors";
import { NavigationActions } from "react-navigation";
import { secondary } from "../color";

@connect(
	state => ({
		users: getUsers(state),
		currentUser: getCurrentUser(state),
		hidePasswords: getHidePasswords(state)
	}),
	dispatch => ({
		setCurrentUser(key) {
			dispatch(setCurrentUser(key));
		},
		removeUser(key) {
			dispatch(removeUser(key));
		},
		toggleHidePasswords() {
			dispatch(toggleHidePasswords());
		}
	})
)
export class UsersScreen extends React.Component {
	static navigationOptions = {
		title: "Users",
		headerStyle: {
			backgroundColor: secondary[500]
		}
	};

	render() {
		// TODO: move to flatlist
		return (
			<View>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor={secondary[700]}
				/>
				<List>
					{this.props.users.map(user => (
						<ListItem
							onPress={() => {
								this.props.setCurrentUser(user.key);
								this.props.navigation.dispatch(
									NavigationActions.reset({
										index: 0,
										actions: [
											NavigationActions.navigate({
												routeName: "Generate"
											})
										]
									})
								);
							}}
							key={"user-" + user.key}
							title={user.name}
							disabled={user.key === this.props.currentUser.key}
						/>
					))}
				</List>
				<List>
					<ListItem
						key="hide-passwords"
						title={"Hide Passwords"}
						switchButton
						hideChevron
						switched={this.props.hidePasswords}
						onSwitch={() => {
							this.props.toggleHidePasswords();
						}}
					/>
					<ListItem
						key="add-user"
						title={"Add User"}
						leftIcon={{
							type: "material-community",
							name: "account-plus"
						}}
						onPress={() => {
							this.props.navigation.navigate("AddUser");
						}}
					/>
					<ListItem
						key="remove-user"
						title={"Remove Current User"}
						leftIcon={{
							type: "material-community",
							name: "delete"
						}}
						onPress={() => {
							Alert.alert(
								"Delete User",
								`Are you sure you want to delete ${
									this.props.currentUser.name
								}?`,
								[
									{
										text: "Cancel",
										onPress: () => {},
										style: "cancel"
									},
									{
										text: "OK",
										onPress: () => {
											this.props.removeUser(
												this.props.currentUser.key
											);
										}
									}
								],
								{ cancelable: false }
							);
						}}
					/>
				</List>
			</View>
		);
	}
}
