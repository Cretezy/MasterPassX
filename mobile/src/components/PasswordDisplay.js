import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

export function PasswordDisplay({ password }) {
	return (
		<View>
			<Text>{password || "Enter site to start..."}</Text>
		</View>
	);
}
