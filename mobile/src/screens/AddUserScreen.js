import React from "react";
import { AddUserForm } from "../components/AddUserForm";
import { NavigationActions } from "react-navigation";
import { primary } from "../color";
import { StatusBar, View } from "react-native";

export function AddUserScreen({ navigation }) {
	return (
		<View>
			{/* Reset status bar color */}
			<StatusBar
				translucent
				barStyle="light-content"
				backgroundColor={primary[700]}
			/>
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
		</View>
	);
}

AddUserScreen.navigationOptions = { title: "Add User" };
