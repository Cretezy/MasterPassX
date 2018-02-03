import React from "react";
import { AddUserForm } from "../components/AddUserForm";
import { connect } from "react-redux";
import { addUser, setCurrentUser } from "../store/users.actions";
import { View } from "react-native";
import { Card, List, ListItem } from "react-native-elements";
import { getCurrentUserKey, getUsers } from "../store/users.selectors";
import { NavigationActions } from "react-navigation";

@connect(
	state => ({
		users: getUsers(state),
		currentUserKey: getCurrentUserKey(state)
	}),
	dispatch => ({
		addUser(name, key, save) {
			dispatch(addUser(name, key, save));
		},
		setCurrentUser(key) {
			dispatch(setCurrentUser(key));
		}
	})
)
export class UsersScreen extends React.Component {
	render() {
		return (
			<View>
				<List containerStyle={{ marginBottom: 20 }}>
					{this.props.users.map(user => (
						<ListItem
							onPress={() => {
								this.props.setCurrentUser(user.key);
								this.props.navigation.dispatch(NavigationActions.reset({
									index: 0,
									actions: [
										NavigationActions.navigate({ routeName: 'Generate' })
									]
								}))
							}}
							key={"user-" + user.key}
							title={user.name}
							disabled={user.key === this.props.currentUserKey}
						/>
					))}
				</List>
				<Card style={{ margin: 10 }} title="Add user">
					<AddUserForm />
				</Card>
			</View>
		);
	}
}
