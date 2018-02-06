import React from "react";
import { AddUserForm } from "../components/AddUserForm";
import { NavigationActions } from "react-navigation";

export function AddUserScreen({ navigation }) {
	return (
		<AddUserForm
			autoFocus
			done={() => {
				navigation.dispatch(
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
		/>
	);
}

AddUserScreen.navigationOptions = { title: "Add User" };
