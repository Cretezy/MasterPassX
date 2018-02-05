import React from "react";
import { connect } from "react-redux";
import { removeUser, setCurrentUser } from "../store/users.actions";
import { View, Alert } from "react-native";
import { List, ListItem } from "react-native-elements";
import { getCurrentUser, getUsers } from "../store/users.selectors";
import { NavigationActions } from "react-navigation";

@connect(
	state => ({
		users: getUsers(state),
		currentUser: getCurrentUser(state)
	}),
	dispatch => ({
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
		// TODO: move to flatlist
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
							disabled={user.key === this.props.currentUser.key}
						/>
					))}
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
