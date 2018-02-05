import React from "react";
import { View } from "react-native";

export function Row(props) {
	return (
		<View
			{...props}
			style={[
				{ flexDirection: "row", alignItems: "stretch" },
				props.style
			]}
		/>
	);
}

export function Item({ size = 1, ...props }) {
	return <View style={{ flex: size }} {...props} />;
}
