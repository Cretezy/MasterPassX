import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

export function CenterText(props) {
	return (
		<View style={{ alignItems: "center", margin: 10 }}>
			<Text {...props} style={[{ textAlign: "center" }, props.style]} />
		</View>
	);
}
