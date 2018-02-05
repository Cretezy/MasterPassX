import React from "react";
import { AddUserForm } from "../components/AddUserForm";
import { connect } from "react-redux";
import { addUser, removeUser, setCurrentUser } from "../store/users.actions";
import { View, Platform, Alert } from "react-native";
import { Card, List, ListItem } from "react-native-elements";
import { getCurrentUser, getUsers } from "../store/users.selectors";
import { NavigationActions } from "react-navigation";
import { Button } from "../components/Button";
import { colors } from "../color";

@connect(
	state => ({
		users: getUsers(state),
		currentUser: getCurrentUser(state)
	}),
	dispatch => ({
		addUser(name, key, save) {
			dispatch(addUser(name, key, save));
		},
		setCurrentUser(key) {
			dispatch(setCurrentUser(key));
		},
		removeUser(key) {
			dispatch(removeUser(key));
		}
	})
)
export class UsersScreen extends React.Component {
	static navigationOptions = {
		title: "Users"
	};

	render() {
		return (
			<View>
				<List containerStyle={{ marginBottom: 10 }}>
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
							rightIconOnPress={() => {
								this.props.removeUser(user.key);
							}}
							disabled={user.key === this.props.currentUser.key}
						/>
					))}
				</List>
				<Card title="Add user">
					<AddUserForm />
				</Card>
				<View style={{ height: 20 }} />
				<Button
					backgroundColor={colors.red[500]}
					icon={{ name: "delete" }}
					title="Delete Current User"
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
			</View>
		);
	}
}
