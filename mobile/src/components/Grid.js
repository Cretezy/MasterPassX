import React from "react";
import { View } from "react-native";

export function Row(props) {
	return <View {...props} style={[{ flexDirection: "row" }, props.style]} />;
}

export function Item({ size = 1, ...props }) {
	return <View {...props} style={[{ flex: size }, props.style]} />;
}
