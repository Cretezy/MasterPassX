import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

export function CenterText({ component: Component = Text, ...props }) {
	return (
		<View style={{ alignItems: "center", margin: 10 }}>
			<Component
				{...props}
				style={[{ textAlign: "center" }, props.style]}
			/>
		</View>
	);
}
